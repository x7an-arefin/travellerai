export function exportToCsv<T extends Record<string, any>>(filename: string, rows: T[]): void {
  if (!rows || rows.length === 0) return

  const keys = Object.keys(rows[0])
  const headerLine = keys.join(',')

  const csvRows = rows.map((row) =>
    keys
      .map((k) => {
        const val = row[k] ?? ''
        const escaped = ('' + val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      .join(',')
  )

  const csvString = [headerLine, ...csvRows].join('\r\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToJson<T>(filename: string, data: T[]): void {
  if (!data || data.length === 0) return

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.json`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPdf<T extends Record<string, any>>(filename: string, title: string, rows: T[]): void {
  if (!rows || rows.length === 0) return

  const keys = Object.keys(rows[0])
  const headersHtml = keys.map((k) => `<th style="padding: 10px; border-bottom: 2px solid #e2e8f0; text-align: left; text-transform: uppercase; font-size: 11px; color: #64748b;">${k}</th>`).join('')

  const rowsHtml = rows
    .map(
      (r) =>
        `<tr style="border-bottom: 1px solid #f1f5f9;">` +
        keys.map((k) => `<td style="padding: 10px; font-size: 12px; color: #1e293b;">${r[k] ?? ''}</td>`).join('') +
        `</tr>`
    )
    .join('')

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  printWindow.document.write(`
    <!Valid HTML>
    <html>
      <head>
        <title>${title} - ${filename}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #0f172a; }
          .header { margin-bottom: 24px; border-bottom: 2px solid #0f172a; padding-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 22px; font-weight: 700; margin: 0; color: #0f172a; }
          .meta { font-size: 11px; color: #64748b; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">${title}</h1>
            <div class="meta">Generated Report &bull; ${new Date().toLocaleString()} &bull; Total records: ${rows.length}</div>
          </div>
        </div>
        <table>
          <thead><tr>${headersHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `)
  printWindow.document.close()
}
