import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../../../../environments/environment'
import {
  HotelProperty,
  RoomType,
  RoomUnit,
  RatePlan,
  InventoryCalendarDay,
  HotelBooking,
  HotelGuestFolioCharge,
  HotelMaintenanceTicket,
  HotelAnalyticsSummary,
} from '../models/hotel.model'

const MOCK_PROPERTIES: HotelProperty[] = [
  {
    id: 'prop-101',
    providerId: 'prov-01',
    name: 'Grand Sylhet Resort & Spa',
    slug: 'grand-sylhet-resort-and-spa',
    propertyType: 'resort',
    starRating: 5,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    address: 'Boroshola, Airport Road',
    city: 'Sylhet',
    country: 'Bangladesh',
    phone: '+880 1711 002233',
    email: 'reservations@grandsylhet.com',
    description: 'Premier 5-star destination resort surrounded by lush tea valleys with infinity pool, spa, and fine dining.',
    coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    status: 'active',
    totalRooms: 120,
    availableRooms: 38,
    startingPrice: 110,
    createdAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'prop-102',
    providerId: 'prov-01',
    name: 'Tea Garden Eco-Lodge Retreat',
    slug: 'tea-garden-eco-lodge-retreat',
    propertyType: 'eco_lodge',
    starRating: 4,
    checkInTime: '13:00',
    checkOutTime: '11:00',
    address: 'Sreemangal Tea Valley Buffer Zone',
    city: 'Sreemangal',
    country: 'Bangladesh',
    phone: '+880 1722 445566',
    email: 'stay@teagardenlodge.com',
    description: 'Eco-conscious bamboo and mahogany timber bungalows perched above rolling green hillocks with guided rainforest walks.',
    coverImageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
    status: 'active',
    totalRooms: 24,
    availableRooms: 6,
    startingPrice: 65,
    createdAt: '2026-02-15T09:30:00.000Z',
  },
  {
    id: 'prop-103',
    providerId: 'prov-02',
    name: 'Bay Vista Boutique Hotel',
    slug: 'bay-vista-boutique-hotel',
    propertyType: 'boutique_hotel',
    starRating: 4,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    address: 'Marine Drive Road, Kolatoli',
    city: 'Cox’s Bazar',
    country: 'Bangladesh',
    phone: '+880 1819 889900',
    email: 'hello@bayvistahotel.com',
    description: 'Direct beachfront boutique hotel with panoramic sunset balconies, private cabanas, and fresh seafood grill.',
    coverImageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    status: 'active',
    totalRooms: 45,
    availableRooms: 12,
    startingPrice: 85,
    createdAt: '2026-03-01T12:00:00.000Z',
  },
]

const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: 'rt-201',
    propertyId: 'prop-101',
    name: 'Deluxe Valley View King',
    slug: 'deluxe-valley-view-king',
    category: 'deluxe_room',
    maxOccupancyAdults: 2,
    maxOccupancyChildren: 1,
    maxTotalGuests: 3,
    baseBedType: 'king',
    extraBedAvailable: true,
    extraBedCost: 25,
    roomSizeSqm: 38,
    viewType: 'mountain_view',
    bathroomType: 'private_ensuite',
    smokingAllowed: false,
    basePricePerNight: 120,
    totalUnitsCount: 40,
    availableUnitsCount: 14,
    amenities: ['High-speed Wi-Fi', 'Smart 55" TV', 'Mini Fridge', 'Rain Shower', 'Tea/Coffee Bar', 'Valley Balcony'],
    photos: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80'],
    isActive: true,
  },
  {
    id: 'rt-202',
    propertyId: 'prop-101',
    name: 'Executive Garden Terrace Suite',
    slug: 'executive-garden-terrace-suite',
    category: 'executive_suite',
    maxOccupancyAdults: 3,
    maxOccupancyChildren: 2,
    maxTotalGuests: 4,
    baseBedType: 'king',
    extraBedAvailable: true,
    extraBedCost: 35,
    roomSizeSqm: 65,
    viewType: 'garden_view',
    bathroomType: 'private_ensuite',
    smokingAllowed: false,
    basePricePerNight: 210,
    totalUnitsCount: 15,
    availableUnitsCount: 4,
    amenities: ['Private Jacuzzi', 'Espresso Machine', 'Executive Lounge Access', 'Butler Service', 'Walk-in Wardrobe'],
    photos: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'],
    isActive: true,
  },
  {
    id: 'rt-203',
    propertyId: 'prop-101',
    name: 'Superior Twin Garden Room',
    slug: 'superior-twin-garden-room',
    category: 'standard_room',
    maxOccupancyAdults: 2,
    maxOccupancyChildren: 1,
    maxTotalGuests: 2,
    baseBedType: 'twin',
    extraBedAvailable: false,
    roomSizeSqm: 30,
    viewType: 'garden_view',
    bathroomType: 'private_ensuite',
    smokingAllowed: false,
    basePricePerNight: 90,
    totalUnitsCount: 30,
    availableUnitsCount: 9,
    amenities: ['Twin Beds', 'Wi-Fi', 'Work Desk', 'Ensuite Shower'],
    photos: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=80'],
    isActive: true,
  },
]

const MOCK_ROOM_UNITS: RoomUnit[] = [
  { id: 'ru-101', roomTypeId: 'rt-201', propertyId: 'prop-101', roomNumber: '101', floorNumber: 1, wingOrBuilding: 'East Wing', physicalStatus: 'clean', currentOccupancyStatus: 'vacant', roomTypeName: 'Deluxe Valley View King' },
  { id: 'ru-102', roomTypeId: 'rt-201', propertyId: 'prop-101', roomNumber: '102', floorNumber: 1, wingOrBuilding: 'East Wing', physicalStatus: 'dirty', currentOccupancyStatus: 'vacant', roomTypeName: 'Deluxe Valley View King' },
  { id: 'ru-103', roomTypeId: 'rt-201', propertyId: 'prop-101', roomNumber: '103', floorNumber: 1, wingOrBuilding: 'East Wing', physicalStatus: 'inspected', currentOccupancyStatus: 'occupied', activeGuestName: 'Mahmudur Rahman', activeBookingId: 'hb-1001', roomTypeName: 'Deluxe Valley View King' },
  { id: 'ru-104', roomTypeId: 'rt-201', propertyId: 'prop-101', roomNumber: '104', floorNumber: 1, wingOrBuilding: 'East Wing', physicalStatus: 'cleaning_in_progress', currentOccupancyStatus: 'vacant', roomTypeName: 'Deluxe Valley View King' },
  { id: 'ru-201', roomTypeId: 'rt-202', propertyId: 'prop-101', roomNumber: '201', floorNumber: 2, wingOrBuilding: 'VIP Tower', physicalStatus: 'clean', currentOccupancyStatus: 'occupied', activeGuestName: 'Jessica Sterling', activeBookingId: 'hb-1002', roomTypeName: 'Executive Garden Terrace Suite' },
  { id: 'ru-202', roomTypeId: 'rt-202', propertyId: 'prop-101', roomNumber: '202', floorNumber: 2, wingOrBuilding: 'VIP Tower', physicalStatus: 'out_of_order', currentOccupancyStatus: 'vacant', roomTypeName: 'Executive Garden Terrace Suite' },
  { id: 'ru-301', roomTypeId: 'rt-203', propertyId: 'prop-101', roomNumber: '301', floorNumber: 3, wingOrBuilding: 'West Wing', physicalStatus: 'clean', currentOccupancyStatus: 'vacant', roomTypeName: 'Superior Twin Garden Room' },
  { id: 'ru-302', roomTypeId: 'rt-203', propertyId: 'prop-101', roomNumber: '302', floorNumber: 3, wingOrBuilding: 'West Wing', physicalStatus: 'dirty', currentOccupancyStatus: 'vacant', roomTypeName: 'Superior Twin Garden Room' },
]

const MOCK_RATE_PLANS: RatePlan[] = [
  {
    id: 'rp-301',
    roomTypeId: 'rt-201',
    propertyId: 'prop-101',
    planCode: 'BAR-CP',
    name: 'Best Available Rate — Breakfast Included (CP)',
    mealPlanType: 'cp_breakfast',
    cancellationPolicyType: 'flexible_24h',
    cancellationCutoffHours: 24,
    cancellationPenaltyPercent: 0,
    isRefundable: true,
    minimumStayNights: 1,
    maximumStayNights: 30,
    basePriceMultiplier: 1.0,
    fixedSurcharge: 0,
    isB2BExclusive: false,
    isActive: true,
  },
  {
    id: 'rp-302',
    roomTypeId: 'rt-201',
    propertyId: 'prop-101',
    planCode: 'NON-REF-15',
    name: 'Early Bird Non-Refundable (15% Off)',
    mealPlanType: 'ep_room_only',
    cancellationPolicyType: 'non_refundable',
    cancellationCutoffHours: 0,
    cancellationPenaltyPercent: 100,
    isRefundable: false,
    minimumStayNights: 2,
    maximumStayNights: 30,
    basePriceMultiplier: 0.85,
    fixedSurcharge: 0,
    isB2BExclusive: false,
    isActive: true,
  },
  {
    id: 'rp-303',
    roomTypeId: 'rt-202',
    propertyId: 'prop-101',
    planCode: 'CORP-HALF-BOARD',
    name: 'Corporate & Tour Group Net Rate (MAP)',
    mealPlanType: 'map_half_board',
    cancellationPolicyType: 'moderate_5d',
    cancellationCutoffHours: 120,
    cancellationPenaltyPercent: 50,
    isRefundable: true,
    minimumStayNights: 3,
    maximumStayNights: 14,
    basePriceMultiplier: 0.90,
    fixedSurcharge: 15,
    isB2BExclusive: true,
    isActive: true,
  },
]

const MOCK_BOOKINGS: HotelBooking[] = [
  {
    id: 'hb-1001',
    bookingReference: 'HTL-2026-8941',
    propertyId: 'prop-101',
    propertyName: 'Grand Sylhet Resort & Spa',
    roomTypeName: 'Deluxe Valley View King',
    assignedRoomNumber: '103',
    checkInDate: '2026-09-14',
    checkOutDate: '2026-09-17',
    totalNights: 3,
    totalRooms: 1,
    totalAdults: 2,
    totalChildren: 0,
    bookingStatus: 'checked_in',
    totalAmount: 414.0,
    roomChargesAmount: 360.0,
    incidentalChargesAmount: 54.0,
    taxAmount: 36.0,
    commissionAmount: 54.0,
    netProviderAmount: 360.0,
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    depositAmount: 100.0,
    specialRequests: 'High floor, quiet corner room with extra feather pillows.',
    estimatedArrivalTime: '14:30',
    contactName: 'Mahmudur Rahman',
    contactEmail: 'mahmud@example.com',
    contactPhone: '+880 1711 998877',
    confirmationQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HTL-2026-8941',
    checkedInAt: '2026-09-14T14:45:00Z',
    folioCharges: [
      { id: 'fc-1', hotelBookingId: 'hb-1001', propertyId: 'prop-101', roomNumber: '103', chargeType: 'room_service', description: 'Club Sandwich & Fresh Mango Smoothie', amount: 24.0, currency: 'USD', isPaid: true, postedAt: '2026-09-14T18:30:00Z' },
      { id: 'fc-2', hotelBookingId: 'hb-1001', propertyId: 'prop-101', roomNumber: '103', chargeType: 'minibar', description: 'Cashew Nuts & San Pellegrino', amount: 30.0, currency: 'USD', isPaid: false, postedAt: '2026-09-14T21:10:00Z' },
    ],
    createdAt: '2026-09-10T11:20:00Z',
  },
  {
    id: 'hb-1002',
    bookingReference: 'HTL-2026-9022',
    propertyId: 'prop-101',
    propertyName: 'Grand Sylhet Resort & Spa',
    roomTypeName: 'Executive Garden Terrace Suite',
    assignedRoomNumber: '201',
    checkInDate: '2026-09-13',
    checkOutDate: '2026-09-16',
    totalNights: 3,
    totalRooms: 1,
    totalAdults: 2,
    totalChildren: 1,
    bookingStatus: 'checked_in',
    totalAmount: 693.0,
    roomChargesAmount: 630.0,
    incidentalChargesAmount: 63.0,
    taxAmount: 63.0,
    commissionAmount: 94.5,
    netProviderAmount: 598.5,
    paymentStatus: 'paid',
    paymentMethod: 'visa',
    depositAmount: 150.0,
    specialRequests: 'Honeymoon arrangement with fruit basket and welcome drink.',
    contactName: 'Jessica Sterling',
    contactEmail: 'jessica.sterling@example.co.uk',
    contactPhone: '+44 7911 123456',
    confirmationQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HTL-2026-9022',
    checkedInAt: '2026-09-13T15:20:00Z',
    folioCharges: [
      { id: 'fc-3', hotelBookingId: 'hb-1002', propertyId: 'prop-101', roomNumber: '201', chargeType: 'spa', description: 'Aromatherapy Herbal Massage (60 min)', amount: 63.0, currency: 'USD', isPaid: false, postedAt: '2026-09-14T11:00:00Z' },
    ],
    createdAt: '2026-09-08T16:00:00Z',
  },
  {
    id: 'hb-1003',
    bookingReference: 'HTL-2026-9150',
    propertyId: 'prop-101',
    propertyName: 'Grand Sylhet Resort & Spa',
    roomTypeName: 'Deluxe Valley View King',
    checkInDate: '2026-09-14',
    checkOutDate: '2026-09-18',
    totalNights: 4,
    totalRooms: 1,
    totalAdults: 2,
    totalChildren: 0,
    bookingStatus: 'confirmed',
    totalAmount: 528.0,
    roomChargesAmount: 480.0,
    incidentalChargesAmount: 0.0,
    taxAmount: 48.0,
    commissionAmount: 72.0,
    netProviderAmount: 456.0,
    paymentStatus: 'paid',
    paymentMethod: 'mastercard',
    depositAmount: 100.0,
    specialRequests: 'Expected late arrival around 19:30. Please hold room.',
    estimatedArrivalTime: '19:30',
    contactName: 'Tariq Al-Mansoor',
    contactEmail: 'tariq.mansoor@almansoor.ae',
    contactPhone: '+971 50 123 4567',
    confirmationQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HTL-2026-9150',
    folioCharges: [],
    createdAt: '2026-09-12T09:15:00Z',
  },
  {
    id: 'hb-1004',
    bookingReference: 'HTL-2026-9177',
    propertyId: 'prop-101',
    propertyName: 'Grand Sylhet Resort & Spa',
    roomTypeName: 'Superior Twin Garden Room',
    checkInDate: '2026-09-14',
    checkOutDate: '2026-09-15',
    totalNights: 1,
    totalRooms: 1,
    totalAdults: 1,
    totalChildren: 0,
    bookingStatus: 'confirmed',
    totalAmount: 99.0,
    roomChargesAmount: 90.0,
    incidentalChargesAmount: 0.0,
    taxAmount: 9.0,
    commissionAmount: 13.5,
    netProviderAmount: 85.5,
    paymentStatus: 'authorized',
    paymentMethod: 'amex',
    depositAmount: 50.0,
    contactName: 'Daniel Schmidt',
    contactEmail: 'dschmidt@berlin-travel.de',
    contactPhone: '+49 170 9876543',
    folioCharges: [],
    createdAt: '2026-09-13T18:40:00Z',
  },
]

const MOCK_MAINTENANCE_TICKETS: HotelMaintenanceTicket[] = [
  {
    id: 'mt-01',
    propertyId: 'prop-101',
    roomUnitId: 'ru-202',
    roomNumber: '202',
    issueCategory: 'hvac_aircon',
    priority: 'urgent',
    description: 'Master suite air conditioning compressor whistling loudly; temperature not dropping below 26°C.',
    status: 'in_progress',
    assignedTo: 'Karimul Hoque (Chief HVAC Tech)',
    reportedAt: '2026-09-14T08:15:00Z',
  },
  {
    id: 'mt-02',
    propertyId: 'prop-101',
    roomUnitId: 'ru-102',
    roomNumber: '102',
    issueCategory: 'plumbing',
    priority: 'high',
    description: 'Shower drain slow to empty; standing water reported by housekeeper after guest checkout.',
    status: 'open',
    reportedAt: '2026-09-14T11:30:00Z',
  },
]

@Injectable({ providedIn: 'root' })
export class HotelApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = `${environment.apiBaseUrl}`

  // 1. Properties
  async getProperties(): Promise<HotelProperty[]> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ data: { items: HotelProperty[] } }>(`${this.baseUrl}/hotel-properties`).pipe(
          catchError(() => of(null))
        )
      )
      if (res?.data?.items?.length) return res.data.items
    } catch (_) {}
    return MOCK_PROPERTIES
  }

  async createProperty(property: Partial<HotelProperty>): Promise<HotelProperty> {
    const newProp: HotelProperty = {
      id: `prop-${Date.now()}`,
      providerId: property.providerId || 'prov-01',
      name: property.name || 'New Property',
      slug: (property.name || 'new-property').toLowerCase().replace(/\s+/g, '-'),
      propertyType: property.propertyType || 'hotel',
      starRating: property.starRating || 4,
      checkInTime: property.checkInTime || '14:00',
      checkOutTime: property.checkOutTime || '11:00',
      address: property.address || 'Address',
      city: property.city || 'City',
      country: property.country || 'Country',
      status: 'active',
      totalRooms: property.totalRooms || 20,
      availableRooms: property.totalRooms || 20,
      startingPrice: property.startingPrice || 80,
      coverImageUrl: property.coverImageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
    }
    try {
      await firstValueFrom(this.http.post(`${this.baseUrl}/hotel-properties`, newProp).pipe(catchError(() => of(null))))
    } catch (_) {}
    MOCK_PROPERTIES.unshift(newProp)
    return newProp
  }

  // 2. Room Types & Units
  async getRoomTypes(propertyId?: string): Promise<RoomType[]> {
    return propertyId ? MOCK_ROOM_TYPES.filter((r) => r.propertyId === propertyId) : MOCK_ROOM_TYPES
  }

  async getRoomUnits(propertyId?: string): Promise<RoomUnit[]> {
    return propertyId ? MOCK_ROOM_UNITS.filter((u) => u.propertyId === propertyId) : MOCK_ROOM_UNITS
  }

  async updateRoomUnitStatus(unitId: string, status: RoomUnit['physicalStatus']): Promise<boolean> {
    const unit = MOCK_ROOM_UNITS.find((u) => u.id === unitId)
    if (unit) {
      unit.physicalStatus = status
      if (status === 'clean') {
        unit.cleanInspectedAt = new Date().toISOString()
      }
      return true
    }
    return false
  }

  // 3. Rate Plans
  async getRatePlans(propertyId?: string): Promise<RatePlan[]> {
    return propertyId ? MOCK_RATE_PLANS.filter((r) => r.propertyId === propertyId) : MOCK_RATE_PLANS
  }

  // 4. Bookings & Front Desk
  async getBookings(propertyId?: string): Promise<HotelBooking[]> {
    return propertyId ? MOCK_BOOKINGS.filter((b) => b.propertyId === propertyId) : MOCK_BOOKINGS
  }

  async assignRoomUnit(bookingId: string, roomUnitId: string): Promise<boolean> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    const unit = MOCK_ROOM_UNITS.find((u) => u.id === roomUnitId)
    if (booking && unit) {
      booking.assignedRoomNumber = unit.roomNumber
      unit.currentOccupancyStatus = 'reserved'
      unit.activeBookingId = booking.id
      unit.activeGuestName = booking.contactName
      return true
    }
    return false
  }

  async checkInBooking(bookingId: string): Promise<boolean> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (booking) {
      booking.bookingStatus = 'checked_in'
      booking.checkedInAt = new Date().toISOString()
      if (booking.assignedRoomNumber) {
        const unit = MOCK_ROOM_UNITS.find((u) => u.roomNumber === booking.assignedRoomNumber)
        if (unit) {
          unit.currentOccupancyStatus = 'occupied'
        }
      }
      return true
    }
    return false
  }

  async checkOutBooking(bookingId: string): Promise<boolean> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    if (booking) {
      booking.bookingStatus = 'checked_out'
      booking.checkedOutAt = new Date().toISOString()
      if (booking.assignedRoomNumber) {
        const unit = MOCK_ROOM_UNITS.find((u) => u.roomNumber === booking.assignedRoomNumber)
        if (unit) {
          unit.currentOccupancyStatus = 'vacant'
          unit.physicalStatus = 'dirty' // Triggers housekeeping workflow
          unit.activeBookingId = undefined
          unit.activeGuestName = undefined
        }
      }
      return true
    }
    return false
  }

  async postFolioCharge(bookingId: string, charge: Omit<HotelGuestFolioCharge, 'id' | 'postedAt' | 'isPaid'>): Promise<HotelGuestFolioCharge> {
    const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId)
    const newCharge: HotelGuestFolioCharge = {
      ...charge,
      id: `fc-${Date.now()}`,
      postedAt: new Date().toISOString(),
      isPaid: false,
    }
    if (booking) {
      booking.folioCharges = booking.folioCharges || []
      booking.folioCharges.push(newCharge)
      booking.incidentalChargesAmount += charge.amount
      booking.totalAmount += charge.amount
    }
    return newCharge
  }

  // 5. Maintenance Tickets
  async getMaintenanceTickets(propertyId?: string): Promise<HotelMaintenanceTicket[]> {
    return propertyId ? MOCK_MAINTENANCE_TICKETS.filter((t) => t.propertyId === propertyId) : MOCK_MAINTENANCE_TICKETS
  }

  async createMaintenanceTicket(ticket: Partial<HotelMaintenanceTicket>): Promise<HotelMaintenanceTicket> {
    const newTicket: HotelMaintenanceTicket = {
      id: `mt-${Date.now()}`,
      propertyId: ticket.propertyId || 'prop-101',
      roomNumber: ticket.roomNumber || 'General',
      issueCategory: ticket.issueCategory || 'plumbing',
      priority: ticket.priority || 'normal',
      description: ticket.description || '',
      status: 'open',
      reportedAt: new Date().toISOString(),
    }
    MOCK_MAINTENANCE_TICKETS.unshift(newTicket)
    return newTicket
  }

  // 6. Analytics
  async getAnalyticsSummary(propertyId?: string): Promise<HotelAnalyticsSummary> {
    return {
      occupancyRatePercent: 78.4,
      occupancyRateChangePercent: 5.2,
      adr: 132.5,
      adrChangePercent: 8.1,
      revPar: 103.88,
      revParChangePercent: 12.4,
      goppar: 64.2,
      totalRoomRevenue: 48200,
      totalAncillaryRevenue: 12400,
      tonightReservationsCount: 14,
      inHouseGuestsCount: 88,
      dirtyRoomsCount: 6,
      availableRoomsCount: 26,
    }
  }
}
