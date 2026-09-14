import { Injectable, inject, signal, computed } from '@angular/core'
import { VehicleApiService } from './services/vehicle-api.service'
import {
  Vehicle,
  Driver,
  VehicleTransferRoute,
  VehicleProtectionPlan,
  VehicleBooking,
  VehicleComplianceDoc,
  FleetAnalyticsSummary,
  VehicleInspection,
} from './models/vehicle.model'

@Injectable({ providedIn: 'root' })
export class VehiclesFacade {
  private readonly api = inject(VehicleApiService)

  readonly vehicles = signal<Vehicle[]>([])
  readonly drivers = signal<Driver[]>([])
  readonly routes = signal<VehicleTransferRoute[]>([])
  readonly protectionPlans = signal<VehicleProtectionPlan[]>([])
  readonly bookings = signal<VehicleBooking[]>([])
  readonly complianceDocs = signal<VehicleComplianceDoc[]>([])
  readonly analytics = signal<FleetAnalyticsSummary | null>(null)
  readonly isLoading = signal<boolean>(false)

  // Filtered / Computed
  readonly activeTrips = computed(() => {
    return this.bookings().filter((b) => b.bookingStatus === 'in_progress' || b.bookingStatus === 'en_route_to_pickup')
  })

  readonly availableVehicles = computed(() => {
    return this.vehicles().filter((v) => v.activeStatus === 'active')
  })

  readonly availableDrivers = computed(() => {
    return this.drivers().filter((d) => d.dutyStatus === 'available')
  })

  readonly fourWheelers = computed(() => {
    return this.vehicles().filter((v) => v.category === 'four_wheeler')
  })

  readonly twoWheelers = computed(() => {
    return this.vehicles().filter((v) => v.category === 'two_wheeler')
  })

  readonly threeWheelers = computed(() => {
    return this.vehicles().filter((v) => v.category === 'three_wheeler_cng')
  })

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    try {
      const [vehs, drvs, rts, pps, bks, docs, anal] = await Promise.all([
        this.api.getVehicles(),
        this.api.getDrivers(),
        this.api.getTransferRoutes(),
        this.api.getProtectionPlans(),
        this.api.getBookings(),
        this.api.getComplianceDocs(),
        this.api.getAnalytics(),
      ])
      this.vehicles.set(vehs)
      this.drivers.set(drvs)
      this.routes.set(rts)
      this.protectionPlans.set(pps)
      this.bookings.set(bks)
      this.complianceDocs.set(docs)
      this.analytics.set(anal)
    } finally {
      this.isLoading.set(false)
    }
  }

  async createVehicle(veh: Partial<Vehicle>): Promise<Vehicle> {
    const created = await this.api.createVehicle(veh)
    this.vehicles.update((list) => [created, ...list])
    return created
  }

  async assignDriver(bookingId: string, driverId: string): Promise<boolean> {
    const success = await this.api.assignDriver(bookingId, driverId)
    if (success) {
      await this.loadAll()
    }
    return success
  }

  async startTrip(bookingId: string, otp: string): Promise<{ ok: boolean; message: string }> {
    const res = await this.api.startTrip(bookingId, otp)
    if (res.ok) {
      await this.loadAll()
    }
    return res
  }

  async completeTrip(bookingId: string): Promise<boolean> {
    const success = await this.api.completeTrip(bookingId)
    if (success) {
      await this.loadAll()
    }
    return success
  }

  async saveInspection(inspection: Omit<VehicleInspection, 'id' | 'inspectedAt'>): Promise<VehicleInspection> {
    const saved = await this.api.saveInspection(inspection)
    await this.loadAll()
    return saved
  }
}
