export interface DashboardKpis {
  totalRevenue: number
  netPlatformEarnings: number
  pendingPayouts: number
  totalBookings: number
  activeTravelers: number
  upcomingDepartures: number
  concludedTours: number
  refundRate: number
  refundAmount: number
  travelerRating: number
  verifiedReviewsCount: number
}

export interface MonthlyTrendItem {
  month: string
  revenue: number
  bookings: number
  travelers: number
}

export interface DashboardReportResponse {
  kpis: DashboardKpis
  monthlyTrends: MonthlyTrendItem[]
  generatedAt: string
}
