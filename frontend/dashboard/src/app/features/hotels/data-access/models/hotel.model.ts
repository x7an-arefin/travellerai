export type PropertyType =
  | 'hotel'
  | 'resort'
  | 'boutique_hotel'
  | 'eco_lodge'
  | 'homestay_guesthouse'
  | 'serviced_apartment'
  | 'hostel'
  | 'camp_glamping'

export type PropertyStatus = 'draft' | 'pending_approval' | 'active' | 'suspended' | 'inactive'

export type RoomPhysicalStatus = 'clean' | 'dirty' | 'cleaning_in_progress' | 'inspected' | 'out_of_order'
export type RoomOccupancyStatus = 'vacant' | 'occupied' | 'reserved'

export type MealPlanType = 'ep_room_only' | 'cp_breakfast' | 'map_half_board' | 'ap_full_board' | 'all_inclusive'
export type CancellationPolicyType = 'flexible_24h' | 'moderate_5d' | 'strict_14d' | 'non_refundable'

export type HotelBookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show'
  | 'refund_pending'
  | 'refunded'

export interface HotelProperty {
  id: string
  providerId: string
  destinationId?: string
  name: string
  slug: string
  propertyType: PropertyType
  starRating: number
  checkInTime: string
  checkOutTime: string
  address: string
  city: string
  country: string
  postalCode?: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  description?: string
  coverImageUrl?: string
  galleryUrls?: string[]
  taxId?: string
  businessRegistrationNumber?: string
  status: PropertyStatus
  totalRooms?: number
  availableRooms?: number
  startingPrice?: number
  createdAt: string
  updatedAt?: string
}

export interface PropertyAmenity {
  id: string
  propertyId: string
  category: string
  amenityCode: string
  name: string
  isFree: boolean
  chargeAmount?: number
  chargeFrequency: string
}

export interface RoomType {
  id: string
  propertyId: string
  name: string
  slug: string
  category: string
  maxOccupancyAdults: number
  maxOccupancyChildren: number
  maxTotalGuests: number
  baseBedType: string
  extraBedAvailable: boolean
  extraBedCost?: number
  roomSizeSqm?: number
  viewType: string
  bathroomType: string
  smokingAllowed: boolean
  basePricePerNight: number
  totalUnitsCount: number
  availableUnitsCount?: number
  amenities?: string[]
  photos?: string[]
  isActive: boolean
}

export interface RoomUnit {
  id: string
  roomTypeId: string
  propertyId: string
  roomNumber: string
  floorNumber: number
  wingOrBuilding?: string
  physicalStatus: RoomPhysicalStatus
  currentOccupancyStatus: RoomOccupancyStatus
  activeBookingId?: string
  activeGuestName?: string
  cleanInspectedAt?: string
  lastCleanedBy?: string
  roomTypeName?: string
}

export interface RatePlan {
  id: string
  roomTypeId: string
  propertyId: string
  planCode: string
  name: string
  mealPlanType: MealPlanType
  cancellationPolicyType: CancellationPolicyType
  cancellationCutoffHours: number
  cancellationPenaltyPercent: number
  isRefundable: boolean
  minimumStayNights: number
  maximumStayNights: number
  basePriceMultiplier: number
  fixedSurcharge: number
  isB2BExclusive: boolean
  isActive: boolean
}

export interface InventoryCalendarDay {
  id: string
  roomTypeId: string
  propertyId: string
  calendarDate: string
  totalAvailable: number
  bookedCount: number
  blockedCount: number
  stopSell: boolean
  closedToArrival: boolean
  closedToDeparture: boolean
  minStayNights: number
  rateMultiplier: number
  customBasePrice?: number
  computedRate?: number
}

export interface HotelGuestFolioCharge {
  id: string
  hotelBookingId: string
  propertyId: string
  roomNumber: string
  chargeType: 'minibar' | 'room_service' | 'laundry' | 'late_checkout' | 'early_checkin' | 'spa' | 'damage' | 'parking' | 'other'
  description: string
  amount: number
  currency: string
  postedBy?: string
  invoiceNumber?: string
  receiptUrl?: string
  isPaid: boolean
  postedAt: string
}

export interface HotelBooking {
  id: string
  bookingReference: string
  travelerId?: string
  propertyId: string
  propertyName?: string
  roomTypeName?: string
  assignedRoomNumber?: string
  checkInDate: string
  checkOutDate: string
  totalNights: number
  totalRooms: number
  totalAdults: number
  totalChildren: number
  bookingStatus: HotelBookingStatus
  totalAmount: number
  roomChargesAmount: number
  incidentalChargesAmount: number
  taxAmount: number
  commissionAmount: number
  netProviderAmount: number
  paymentStatus: 'pending' | 'authorized' | 'partially_paid' | 'paid' | 'refunded'
  paymentMethod?: string
  depositAmount: number
  specialRequests?: string
  estimatedArrivalTime?: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  confirmationQrCode?: string
  checkedInAt?: string
  checkedOutAt?: string
  folioCharges?: HotelGuestFolioCharge[]
  createdAt: string
}

export interface HotelMaintenanceTicket {
  id: string
  propertyId: string
  roomUnitId?: string
  roomNumber?: string
  reportedBy?: string
  issueCategory: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  description: string
  photoUrls?: string[]
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'cannot_reproduce' | 'cancelled'
  assignedTo?: string
  resolutionNotes?: string
  costAmount?: number
  reportedAt: string
  resolvedAt?: string
}

export interface HotelAnalyticsSummary {
  occupancyRatePercent: number
  occupancyRateChangePercent: number
  adr: number
  adrChangePercent: number
  revPar: number
  revParChangePercent: number
  goppar: number
  totalRoomRevenue: number
  totalAncillaryRevenue: number
  tonightReservationsCount: number
  inHouseGuestsCount: number
  dirtyRoomsCount: number
  availableRoomsCount: number
}
