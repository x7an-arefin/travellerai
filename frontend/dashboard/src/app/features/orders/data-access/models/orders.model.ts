export interface OrderItem {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  items: {
    name: string
    qty: number
    price: string
    category?: string
  }[]
  totalAmount: string
  totalNumeric: number
  status: 'processing' | 'shipped' | 'delivered' | 'refunded'
  date: string
  trackingNumber: string
  address: string
  serviceType?: 'bundle' | 'hotel' | 'vehicle' | 'package'
  paymentMethod?: string
  receiptUrl?: string
}

export interface OrderStats {
  totalRevenue: number
  avgOrderValue: number
  inTransitCount: number
  returnRate: number
}
