import { TripInquiry, Quotation } from './inquiries.model'

export type NewTripInquiry = Omit<TripInquiry, 'id' | 'createdAt' | 'quotationCount' | 'quotations'>
export type UpdateTripInquiry = Partial<NewTripInquiry>

export type NewQuotation = Omit<Quotation, 'id' | 'createdAt'>

export interface TripInquiryListResponse {
  items: TripInquiry[]
  total?: number
}
