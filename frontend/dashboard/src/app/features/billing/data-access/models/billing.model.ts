export interface BillingInvoiceReceipt {
  id: string
  bookingReference?: string
  date: string
  period: string
  amount: string
  status: 'paid' | 'pending' | 'refunded'
  pdfUrl?: string
}

export interface BillingPlanInfo {
  name: string
  badge: string
  priceFormatted: string
  billingCycle: string
  renewalDate: string
  status: 'active' | 'trial' | 'past_due'
  features: string[]
}

export interface BillingUsageMeters {
  bookingsCount: number
  bookingsLimit: number
  smsNotificationsSent: number
  smsLimit: number
  cloudStorageUsedGb: number
  cloudStorageLimitGb: number
}

export interface PaymentMethodInfo {
  brand: string
  last4: string
  expiry: string
  billingEmail: string
}

export interface BillingOverviewData {
  plan: BillingPlanInfo
  paymentMethod: PaymentMethodInfo
  usage: BillingUsageMeters
  invoices: BillingInvoiceReceipt[]
}
