import { Injectable } from '@angular/core'

export interface CsvColumn<T> {
  header: string
  accessor: (item: T) => any
}

export interface PrintOptions {
  title: string
  subtitle?: string
  meta?: { label: string; value: any }[]
  bodyHtml: string
}

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * Export an array of data items to a cleanly formatted CSV file.
   * Automatically handles UTF-8 BOM, quotes escaping, commas, and browser download trigger.
   * If columns are omitted, column headers are auto-derived from object keys.
   */
  exportToCsv<T extends object>(filename: string, data: T[], columns?: CsvColumn<T>[]): void {
    if (!data || !data.length) {
      return
    }

    const cols: CsvColumn<T>[] = columns && columns.length
      ? columns
      : Object.keys(data[0]).map((k) => ({
          header: k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
          accessor: (item: T) => (item as any)[k],
        }))

    const headerRow = cols.map((c) => this.escapeCsv(c.header)).join(',')
    const rows = data.map((item) => {
      return cols
        .map((c) => {
          const val = c.accessor(item)
          return this.escapeCsv(val)
        })
        .join(',')
    })

    const csvContent = '\uFEFF' + [headerRow, ...rows].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Print a formatted HTML document in a dedicated printable iframe or popup window.
   * Supports both (title, htmlBody) and (PrintOptions).
   */
  printDocument(
    titleOrOptions: string | PrintOptions,
    maybeHtmlBody?: string,
  ): void {
    const isOptions = typeof titleOrOptions !== 'string'
    const title = isOptions ? titleOrOptions.title : titleOrOptions
    const subtitle = isOptions && titleOrOptions.subtitle ? titleOrOptions.subtitle : ''
    const metaList = isOptions && titleOrOptions.meta ? titleOrOptions.meta : []
    const bodyContent = isOptions ? titleOrOptions.bodyHtml : (maybeHtmlBody || '')

    const metaHtml = metaList.length
      ? `
        <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:20px; padding:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; font-size:12px;">
          ${metaList.map((m) => `<div><strong style="color:#64748b;">${m.label}:</strong> <span style="font-weight:600; color:#0f172a;">${m.value}</span></div>`).join('')}
        </div>
      `
      : ''

    const printWindow = window.open('', '_blank', 'width=900,height=700')
    if (!printWindow) {
      // Fallback to direct print if popup blocked
      window.print()
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #1e293b;
              margin: 40px;
              line-height: 1.5;
            }
            .header {
              border-bottom: 2px solid #0f172a;
              padding-bottom: 12px;
              margin-bottom: 24px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            h1 { font-size: 22px; margin: 0; color: #0f172a; }
            .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
            .badge {
              font-size: 11px;
              font-weight: 600;
              padding: 4px 8px;
              background: #f1f5f9;
              border-radius: 4px;
              text-transform: uppercase;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 16px;
              font-size: 12px;
            }
            th {
              background: #f8fafc;
              text-align: left;
              padding: 8px 12px;
              border-bottom: 1px solid #cbd5e1;
              color: #475569;
              font-weight: 600;
            }
            td {
              padding: 8px 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            tr:nth-child(even) {
              background: #fafafa;
            }
            .total-row {
              font-weight: bold;
              border-top: 2px solid #0f172a;
            }
            .footer {
              margin-top: 40px;
              font-size: 11px;
              color: #94a3b8;
              text-align: center;
              border-top: 1px solid #e2e8f0;
              padding-top: 12px;
            }
            @media print {
              body { margin: 20px; }
              @page { size: portrait; margin: 15mm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>${title}</h1>
              ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
              <div class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} — Traveller AI Platform</div>
            </div>
            <div class="badge">Official Record</div>
          </div>
          ${metaHtml}
          ${bodyContent}
          <div class="footer">
            Traveller AI Global Marketplace • Confidential & Proprietary
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  private escapeCsv(val: any): string {
    if (val === null || val === undefined) {
      return '""'
    }
    const str = String(val).replace(/"/g, '""')
    return `"${str}"`
  }
}
