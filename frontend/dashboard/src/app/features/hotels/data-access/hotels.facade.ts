import { Injectable, inject, signal, computed } from '@angular/core'
import { HotelApiService } from './services/hotel-api.service'
import {
  HotelProperty,
  RoomType,
  RoomUnit,
  RatePlan,
  HotelBooking,
  HotelMaintenanceTicket,
  HotelAnalyticsSummary,
  HotelGuestFolioCharge,
} from './models/hotel.model'

@Injectable({ providedIn: 'root' })
export class HotelsFacade {
  private readonly api = inject(HotelApiService)

  readonly properties = signal<HotelProperty[]>([])
  readonly selectedPropertyId = signal<string>('prop-101')
  readonly roomTypes = signal<RoomType[]>([])
  readonly roomUnits = signal<RoomUnit[]>([])
  readonly ratePlans = signal<RatePlan[]>([])
  readonly bookings = signal<HotelBooking[]>([])
  readonly maintenanceTickets = signal<HotelMaintenanceTicket[]>([])
  readonly analytics = signal<HotelAnalyticsSummary | null>(null)
  readonly isLoading = signal<boolean>(false)

  // Computed selections
  readonly selectedProperty = computed(() => {
    const list = this.properties()
    const id = this.selectedPropertyId()
    return list.find((p) => p.id === id) || list[0] || null
  })

  // Front Desk Computed Queues
  readonly expectedArrivalsToday = computed(() => {
    return this.bookings().filter((b) => b.bookingStatus === 'confirmed' || b.bookingStatus === 'pending_payment')
  })

  readonly inHouseGuests = computed(() => {
    return this.bookings().filter((b) => b.bookingStatus === 'checked_in')
  })

  readonly scheduledDeparturesToday = computed(() => {
    return this.bookings().filter((b) => b.bookingStatus === 'checked_in')
  })

  // Housekeeping Room Counters
  readonly dirtyRooms = computed(() => {
    return this.roomUnits().filter((u) => u.physicalStatus === 'dirty')
  })

  readonly cleanRooms = computed(() => {
    return this.roomUnits().filter((u) => u.physicalStatus === 'clean' || u.physicalStatus === 'inspected')
  })

  readonly cleaningInProgressRooms = computed(() => {
    return this.roomUnits().filter((u) => u.physicalStatus === 'cleaning_in_progress')
  })

  readonly outOfOrderRooms = computed(() => {
    return this.roomUnits().filter((u) => u.physicalStatus === 'out_of_order')
  })

  async loadAll(propertyId?: string): Promise<void> {
    this.isLoading.set(true)
    const targetId = propertyId || this.selectedPropertyId()
    try {
      const [props, types, units, rates, bks, tickets, anal] = await Promise.all([
        this.api.getProperties(),
        this.api.getRoomTypes(targetId),
        this.api.getRoomUnits(targetId),
        this.api.getRatePlans(targetId),
        this.api.getBookings(targetId),
        this.api.getMaintenanceTickets(targetId),
        this.api.getAnalyticsSummary(targetId),
      ])
      this.properties.set(props)
      this.roomTypes.set(types)
      this.roomUnits.set(units)
      this.ratePlans.set(rates)
      this.bookings.set(bks)
      this.maintenanceTickets.set(tickets)
      this.analytics.set(anal)
    } finally {
      this.isLoading.set(false)
    }
  }

  selectProperty(id: string): void {
    this.selectedPropertyId.set(id)
    this.loadAll(id)
  }

  async createProperty(property: Partial<HotelProperty>): Promise<HotelProperty> {
    const created = await this.api.createProperty(property)
    this.properties.update((list) => [created, ...list])
    return created
  }

  async assignRoomUnit(bookingId: string, roomUnitId: string): Promise<boolean> {
    const success = await this.api.assignRoomUnit(bookingId, roomUnitId)
    if (success) {
      await this.loadAll()
    }
    return success
  }

  async checkIn(bookingId: string): Promise<boolean> {
    const success = await this.api.checkInBooking(bookingId)
    if (success) {
      await this.loadAll()
    }
    return success
  }

  async checkOut(bookingId: string): Promise<boolean> {
    const success = await this.api.checkOutBooking(bookingId)
    if (success) {
      await this.loadAll()
    }
    return success
  }

  async postFolioCharge(bookingId: string, charge: Omit<HotelGuestFolioCharge, 'id' | 'postedAt' | 'isPaid'>): Promise<void> {
    await this.api.postFolioCharge(bookingId, charge)
    await this.loadAll()
  }

  async updateRoomStatus(unitId: string, status: RoomUnit['physicalStatus']): Promise<boolean> {
    const success = await this.api.updateRoomUnitStatus(unitId, status)
    if (success) {
      this.roomUnits.update((units) =>
        units.map((u) => (u.id === unitId ? { ...u, physicalStatus: status } : u))
      )
    }
    return success
  }

  async reportMaintenance(ticket: Partial<HotelMaintenanceTicket>): Promise<HotelMaintenanceTicket> {
    const created = await this.api.createMaintenanceTicket(ticket)
    this.maintenanceTickets.update((list) => [created, ...list])
    return created
  }
}
