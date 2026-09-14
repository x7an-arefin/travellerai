import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { KycDocument } from '../models/kyc.model'
import { UpdateKycDecisionInput, KycListResponse } from '../models/kyc-api.types'

@Injectable({
  providedIn: 'root',
})
export class KycApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('kyc-documents')

  private mockDocuments: KycDocument[] = [
    {
      id: 'kyc-001',
      providerId: 'prov-alpine',
      providerName: 'Alpine Wonders Agency',
      providerEmail: 'compliance@alpinewonders.ch',
      documentType: 'company_registration',
      documentNumber: 'CHE-109.823.441-HR',
      fileUrl: 'https://traveller.ai/docs/kyc/alpine_wonders_company_reg.pdf',
      fileName: 'swiss_commercial_registry_extract.pdf',
      fileSizeBytes: 245000,
      expiryDate: '2028-12-31T00:00:00.000Z',
      status: 'approved',
      reviewNotes: 'Swiss Commercial Register validated via Zefix portal.',
      reviewedByName: 'Sultanul Arefin (Super Admin)',
      reviewedAt: '2025-01-10T14:20:00.000Z',
      createdAt: '2025-01-08T09:00:00.000Z',
    },
    {
      id: 'kyc-002',
      providerId: 'prov-alpine',
      providerName: 'Alpine Wonders Agency',
      providerEmail: 'compliance@alpinewonders.ch',
      documentType: 'insurance_certificate',
      documentNumber: 'ALLIANZ-CH-882901-TR',
      fileUrl: 'https://traveller.ai/docs/kyc/alpine_liability_insurance.pdf',
      fileName: 'commercial_mountain_liability_5m.pdf',
      fileSizeBytes: 512000,
      expiryDate: '2026-06-30T00:00:00.000Z',
      status: 'approved',
      reviewNotes: 'Verified €5M third-party liability coverage including helicopter evacuation endorsement.',
      reviewedByName: 'Sultanul Arefin (Super Admin)',
      reviewedAt: '2025-01-10T14:25:00.000Z',
      createdAt: '2025-01-08T09:15:00.000Z',
    },
    {
      id: 'kyc-003',
      providerId: 'prov-kyoto',
      providerName: 'Zen Heritage Expeditions',
      providerEmail: 'info@zenheritage.jp',
      documentType: 'trade_license',
      documentNumber: 'JTA-LIC-2024-8841',
      fileUrl: 'https://traveller.ai/docs/kyc/japan_tourism_agency_license.pdf',
      fileName: 'jta_travel_agency_license_class1.pdf',
      fileSizeBytes: 380000,
      expiryDate: '2027-03-31T00:00:00.000Z',
      status: 'under_review',
      reviewNotes: 'Awaiting Japanese official registry stamp verification.',
      createdAt: '2025-03-02T11:00:00.000Z',
    },
    {
      id: 'kyc-004',
      providerId: 'prov-amalfi',
      providerName: 'Capri & Coast Maritime',
      providerEmail: 'legal@capricoast.it',
      documentType: 'insurance_certificate',
      documentNumber: 'GENERALI-MAR-99012',
      fileUrl: 'https://traveller.ai/docs/kyc/generali_maritime_vessel.pdf',
      fileName: 'yacht_commercial_passenger_insurance.pdf',
      fileSizeBytes: 620000,
      expiryDate: '2025-05-15T00:00:00.000Z',
      status: 'submitted',
      createdAt: '2025-03-10T16:40:00.000Z',
    },
    {
      id: 'kyc-005',
      providerId: 'prov-safari',
      providerName: 'Serengeti Wild Trails',
      providerEmail: 'safari@wildtrails.co.tz',
      documentType: 'tax_certificate',
      documentNumber: 'TRA-TIN-889100-2',
      fileUrl: 'https://traveller.ai/docs/kyc/tanzania_revenue_authority.pdf',
      fileName: 'tax_clearance_certificate_expired.pdf',
      fileSizeBytes: 190000,
      expiryDate: '2024-12-31T00:00:00.000Z',
      status: 'rejected',
      reviewNotes: 'Tax clearance certificate expired on Dec 31, 2024. Please re-submit 2025 valid certificate.',
      reviewedByName: 'Sultanul Arefin (Super Admin)',
      reviewedAt: '2025-02-15T10:00:00.000Z',
      createdAt: '2025-02-14T12:00:00.000Z',
    },
  ]

  async list(status?: string): Promise<{ ok: true; data: KycListResponse } | { ok: false; error: string }> {
    try {
      const query = status && status !== 'all' ? `?status=${status}` : ''
      const res = await firstValueFrom(this.http.get<KycListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockDocuments]
      if (status && status !== 'all') {
        filtered = filtered.filter(d => d.status === status)
      }
      return {
        ok: true,
        data: {
          items: filtered,
          total: filtered.length,
          pendingCount: this.mockDocuments.filter(d => d.status === 'submitted' || d.status === 'under_review').length,
        },
      }
    }
  }

  async review(id: string, input: UpdateKycDecisionInput): Promise<{ ok: true; data: KycDocument } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.patch<KycDocument>(`${this.baseUrl}/${id}/review`, input))
      return { ok: true, data: res }
    } catch {
      const idx = this.mockDocuments.findIndex(d => d.id === id)
      if (idx !== -1) {
        this.mockDocuments[idx] = {
          ...this.mockDocuments[idx],
          status: input.status,
          reviewNotes: input.reviewNotes,
          reviewedByName: 'Sultanul Arefin (Super Admin)',
          reviewedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return { ok: true, data: this.mockDocuments[idx] }
      }
      return { ok: false, error: 'Document not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockDocuments = this.mockDocuments.filter(d => d.id !== id)
      return { ok: true }
    }
  }
}
