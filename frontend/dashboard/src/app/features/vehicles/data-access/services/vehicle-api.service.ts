import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from '../../../../../environments/environment'
import {
  Vehicle,
  VehicleComplianceDoc,
  VehiclePricingPlan,
  VehicleProtectionPlan,
  Driver,
  VehicleBooking,
  VehicleInspection,
  VehicleTransferRoute,
  FleetAnalyticsSummary,
} from '../models/vehicle.model'

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    providerId: 'prov-01',
    registrationNumber: 'DHK-MET-GA-14-8890',
    vinNumber: 'JTDBT4839392019',
    make: 'Toyota',
    model: 'Prado Land Cruiser TX-L',
    year: 2023,
    category: 'four_wheeler',
    subCategory: 'fullsize_suv_4x4',
    seatingCapacity: 7,
    luggageCapacityLarge: 4,
    luggageCapacitySmall: 3,
    transmission: 'automatic',
    fuelType: 'diesel',
    driveTrain: 'awd_4x4',
    color: 'Pearl White',
    airConditioning: 'climate_control',
    engineDisplacementCc: 2800,
    currentOdometerKm: 18450,
    currentFuelLevelPercent: 100,
    activeStatus: 'active',
    isAvailableForRental: true,
    isAvailableWithDriver: true,
    currentLocationAddress: 'Depot A, Gulshan-2, Dhaka',
    dailyRate: 145,
    depositAmount: 400,
    photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'],
    features: ['4x4 Terrain Mode', 'Panoramic Sunroof', 'Leather Interior', 'Roof Carrier', 'GPS Telematics', 'Dashcam'],
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'veh-02',
    providerId: 'prov-01',
    registrationNumber: 'SYL-CHA-11-4455',
    vinNumber: 'BAJAJRE20249918',
    make: 'Bajaj',
    model: 'RE 4-Stroke CNG Auto-Rickshaw',
    year: 2024,
    category: 'three_wheeler_cng',
    subCategory: 'cng_auto_rickshaw',
    seatingCapacity: 3,
    luggageCapacityLarge: 1,
    luggageCapacitySmall: 2,
    transmission: 'manual',
    fuelType: 'cng',
    driveTrain: 'rwd',
    color: 'Forest Green & Yellow',
    airConditioning: 'none',
    engineDisplacementCc: 198,
    currentOdometerKm: 6200,
    currentFuelLevelPercent: 85,
    cngCylinderTestExpiry: '2027-04-15',
    activeStatus: 'active',
    isAvailableForRental: true,
    isAvailableWithDriver: true,
    currentLocationAddress: 'Tea Valley Stand, Sreemangal',
    dailyRate: 28,
    depositAmount: 80,
    photos: ['https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=800&auto=format&fit=crop&q=80'],
    features: ['Open-air Scenic View', 'Rain Waterproof Side Curtains', 'USB Phone Charger Mount', 'Digital Fare Meter'],
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'veh-03',
    providerId: 'prov-01',
    registrationNumber: 'CTG-MET-HA-32-1100',
    vinNumber: 'HONDANMAX202301',
    make: 'Yamaha',
    model: 'NMAX 155 ABS Scooter',
    year: 2023,
    category: 'two_wheeler',
    subCategory: 'premium_scooter',
    seatingCapacity: 2,
    luggageCapacityLarge: 0,
    luggageCapacitySmall: 1,
    transmission: 'automatic',
    fuelType: 'petrol',
    driveTrain: 'rwd',
    color: 'Matte Dark Blue',
    airConditioning: 'none',
    engineDisplacementCc: 155,
    currentOdometerKm: 4320,
    currentFuelLevelPercent: 90,
    activeStatus: 'active',
    isAvailableForRental: true,
    isAvailableWithDriver: false,
    currentLocationAddress: 'Marine Drive Depot, Cox’s Bazar',
    dailyRate: 22,
    depositAmount: 100,
    photos: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80'],
    features: ['2 Helmets Included', 'Phone Mount Bracket', 'Underseat Storage 23L', 'Rain Ponchos (x2)', 'ABS Disc Brakes'],
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'veh-04',
    providerId: 'prov-02',
    registrationNumber: 'DHK-MET-CHA-55-9011',
    vinNumber: 'HIACESUPERL2022',
    make: 'Toyota',
    model: 'HiAce Commuter High-Roof Van',
    year: 2022,
    category: 'four_wheeler',
    subCategory: 'minibus',
    seatingCapacity: 14,
    luggageCapacityLarge: 8,
    luggageCapacitySmall: 8,
    transmission: 'automatic',
    fuelType: 'diesel',
    driveTrain: 'rwd',
    color: 'Silver Metallic',
    airConditioning: 'climate_control',
    engineDisplacementCc: 3000,
    currentOdometerKm: 42100,
    currentFuelLevelPercent: 95,
    activeStatus: 'active',
    isAvailableForRental: false,
    isAvailableWithDriver: true,
    currentLocationAddress: 'Airport Transfer Station, Hazrat Shahjalal Airport',
    dailyRate: 110,
    depositAmount: 250,
    photos: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80'],
    features: ['Dual AC Roof Vents', 'Reclining Seats with Headrests', 'Large Rear Luggage Rack', 'PA Microphone System'],
    createdAt: '2026-01-20T14:00:00Z',
  },
]

const MOCK_COMPLIANCE_DOCS: VehicleComplianceDoc[] = [
  { id: 'cd-1', vehicleId: 'veh-01', documentType: 'registration_card', documentNumber: 'REG-2023-99882', expiryDate: '2028-06-30', documentFileUrl: 'https://media.travellerai.com/docs/reg-01.pdf', verificationStatus: 'verified' },
  { id: 'cd-2', vehicleId: 'veh-01', documentType: 'insurance_policy', documentNumber: 'INS-COMP-55441', expiryDate: '2026-11-20', documentFileUrl: 'https://media.travellerai.com/docs/ins-01.pdf', verificationStatus: 'verified' },
  { id: 'cd-3', vehicleId: 'veh-02', documentType: 'cng_cylinder_test', documentNumber: 'CNG-TEST-4412', expiryDate: '2027-04-15', documentFileUrl: 'https://media.travellerai.com/docs/cng-02.pdf', verificationStatus: 'verified' },
  { id: 'cd-4', vehicleId: 'veh-04', documentType: 'fitness_certificate', documentNumber: 'FIT-BRTA-2024-88', expiryDate: '2026-10-05', documentFileUrl: 'https://media.travellerai.com/docs/fit-04.pdf', verificationStatus: 'verified' },
]

const MOCK_PROTECTION_PLANS: VehicleProtectionPlan[] = [
  { id: 'pp-01', planCode: 'basic_liability', name: 'Third-Party Liability (Included)', description: 'Standard legal minimum third-party coverage. Renter is liable for vehicle damage up to full deposit.', dailyRate: 0, collisionDeductibleAmount: 500, theftDeductibleAmount: 1000, glassTireCovered: false, roadsideAssistanceCovered: false, isActive: true },
  { id: 'pp-02', planCode: 'collision_damage_waiver', name: 'Collision Damage Waiver (CDW)', description: 'Reduces renter out-of-pocket financial liability for accidental bodywork collision damage to a low deductible.', dailyRate: 8, collisionDeductibleAmount: 150, theftDeductibleAmount: 500, glassTireCovered: false, roadsideAssistanceCovered: true, isActive: true },
  { id: 'pp-03', planCode: 'full_damage_waiver', name: 'Zero-Excess Full Protection (FDW)', description: 'Complete zero-excess peace of mind: collision, vehicle theft, windshield chips, tire punctures, and 24/7 roadside assistance.', dailyRate: 18, collisionDeductibleAmount: 0, theftDeductibleAmount: 0, glassTireCovered: true, roadsideAssistanceCovered: true, isActive: true },
]

const MOCK_DRIVERS: Driver[] = [
  { id: 'drv-01', providerId: 'prov-01', fullName: 'Abdur Razzaq', phone: '+880 1712 345678', email: 'razzaq@chauffeur.com', licenseNumber: 'DL-DHK-48201', licenseCategory: 'Commercial Heavy', licenseExpiryDate: '2028-09-30', yearsOfExperience: 11, assignedVehicleId: 'veh-01', assignedVehicleName: 'Toyota Prado Land Cruiser', dutyStatus: 'available', overallRating: 4.95, completedTripsCount: 342, isVerified: true, createdAt: '2025-06-10T00:00:00Z' },
  { id: 'drv-02', providerId: 'prov-01', fullName: 'Mohammad Faruk', phone: '+880 1819 765432', email: 'faruk.cng@gmail.com', licenseNumber: 'DL-SYL-19022', licenseCategory: 'Commercial Light', licenseExpiryDate: '2027-12-15', yearsOfExperience: 8, assignedVehicleId: 'veh-02', assignedVehicleName: 'Bajaj CNG Auto-Rickshaw', dutyStatus: 'on_trip', overallRating: 4.88, completedTripsCount: 512, isVerified: true, createdAt: '2025-08-14T00:00:00Z' },
  { id: 'drv-03', providerId: 'prov-02', fullName: 'Shamsul Alam', phone: '+880 1911 556677', email: 'shamsul@transfers.bd', licenseNumber: 'DL-CTG-33019', licenseCategory: 'Commercial PSV Coach', licenseExpiryDate: '2029-01-20', yearsOfExperience: 14, assignedVehicleId: 'veh-04', assignedVehicleName: 'Toyota HiAce High-Roof Van', dutyStatus: 'available', overallRating: 4.98, completedTripsCount: 480, isVerified: true, createdAt: '2025-04-01T00:00:00Z' },
]

const MOCK_ROUTES: VehicleTransferRoute[] = [
  { id: 'vr-01', providerId: 'prov-01', originName: 'Hazrat Shahjalal Int. Airport (DAC)', destinationName: 'Gulshan / Banani / Diplomatic Zone', distanceKm: 12.5, estimatedDurationMinutes: 35, vehicleCategory: 'economy_sedan', fixedFareAmount: 25, driverAllowanceAmount: 5, tollIncluded: true, isActive: true },
  { id: 'vr-02', providerId: 'prov-01', originName: 'Hazrat Shahjalal Int. Airport (DAC)', destinationName: 'Motijheel Commercial District', distanceKm: 22.0, estimatedDurationMinutes: 60, vehicleCategory: 'premium_sedan', fixedFareAmount: 42, driverAllowanceAmount: 8, tollIncluded: true, isActive: true },
  { id: 'vr-03', providerId: 'prov-01', originName: 'Osmani Int. Airport (ZYL), Sylhet', destinationName: 'Sreemangal Tea Resort Buffer Zone', distanceKm: 85.0, estimatedDurationMinutes: 120, vehicleCategory: 'fullsize_suv_4x4', fixedFareAmount: 75, driverAllowanceAmount: 15, tollIncluded: true, isActive: true },
]

const MOCK_VEHICLE_BOOKINGS: VehicleBooking[] = [
  {
    id: 'vb-501',
    bookingReference: 'VHC-2026-1049',
    providerId: 'prov-01',
    vehicleId: 'veh-01',
    vehicleName: 'Toyota Prado Land Cruiser TX-L',
    driverId: 'drv-01',
    driverName: 'Abdur Razzaq',
    rentalModel: 'with_driver',
    serviceType: 'airport_transfer_arrival',
    pickupDateTime: '2026-09-14T15:30:00Z',
    returnDateTime: '2026-09-14T17:30:00Z',
    pickupLocationAddress: 'Terminal 2 Arrivals, Hazrat Shahjalal Int. Airport',
    dropoffLocationAddress: 'Grand Sylhet Resort & Spa, Boroshola',
    flightNumber: 'EK-582',
    flightEta: '14:50',
    flightStatus: 'delayed',
    passengerCount: 3,
    bookingStatus: 'assigned',
    baseRentalAmount: 75.0,
    extrasAmount: 10.0,
    protectionPlanAmount: 18.0,
    protectionPlanName: 'Zero-Excess Full Protection (FDW)',
    driverAllowanceAmount: 15.0,
    taxAmount: 9.0,
    totalAmount: 127.0,
    securityDepositAmount: 0.0,
    depositHoldStatus: 'none',
    commissionAmount: 19.05,
    netProviderAmount: 107.95,
    paymentStatus: 'paid',
    otpCode: '4821',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VHC-2026-1049',
    createdAt: '2026-09-11T14:10:00Z',
  },
  {
    id: 'vb-502',
    bookingReference: 'VHC-2026-1088',
    providerId: 'prov-01',
    vehicleId: 'veh-03',
    vehicleName: 'Yamaha NMAX 155 ABS Scooter',
    rentalModel: 'self_drive',
    serviceType: 'self_drive_rental',
    pickupDateTime: '2026-09-15T09:00:00Z',
    returnDateTime: '2026-09-17T18:00:00Z',
    pickupLocationAddress: 'Marine Drive Depot, Cox’s Bazar',
    dropoffLocationAddress: 'Marine Drive Depot, Cox’s Bazar',
    passengerCount: 2,
    bookingStatus: 'confirmed',
    baseRentalAmount: 55.0,
    extrasAmount: 0.0,
    protectionPlanAmount: 16.0,
    protectionPlanName: 'Collision Damage Waiver (CDW)',
    driverAllowanceAmount: 0.0,
    taxAmount: 6.0,
    totalAmount: 77.0,
    securityDepositAmount: 100.0,
    depositHoldStatus: 'authorized',
    commissionAmount: 11.55,
    netProviderAmount: 65.45,
    paymentStatus: 'paid',
    otpCode: '8910',
    createdAt: '2026-09-12T10:30:00Z',
  },
  {
    id: 'vb-503',
    bookingReference: 'VHC-2026-1095',
    providerId: 'prov-01',
    vehicleId: 'veh-02',
    vehicleName: 'Bajaj RE 4-Stroke CNG Auto-Rickshaw',
    driverId: 'drv-02',
    driverName: 'Mohammad Faruk',
    rentalModel: 'with_driver',
    serviceType: 'full_day_tour',
    pickupDateTime: '2026-09-14T08:00:00Z',
    returnDateTime: '2026-09-14T17:00:00Z',
    pickupLocationAddress: 'Tea Garden Eco-Lodge, Sreemangal',
    dropoffLocationAddress: 'Tea Garden Eco-Lodge, Sreemangal',
    passengerCount: 3,
    bookingStatus: 'in_progress',
    baseRentalAmount: 32.0,
    extrasAmount: 5.0,
    protectionPlanAmount: 0.0,
    driverAllowanceAmount: 10.0,
    taxAmount: 3.5,
    totalAmount: 50.5,
    securityDepositAmount: 0.0,
    depositHoldStatus: 'none',
    commissionAmount: 7.5,
    netProviderAmount: 43.0,
    paymentStatus: 'paid',
    otpCode: '3192',
    startedAt: '2026-09-14T08:10:00Z',
    createdAt: '2026-09-13T16:20:00Z',
  },
]

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = `${environment.apiBaseUrl}`

  // 1. Fleet Vehicles
  async getVehicles(): Promise<Vehicle[]> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ data?: { items?: Vehicle[] }; items?: Vehicle[] }>(`${this.baseUrl}/vehicles`).pipe(catchError(() => of(null)))
      )
      if (res !== null) {
        return res?.data?.items ?? res?.items ?? []
      }
    } catch (_) {}
    if (!environment.production) {
      return MOCK_VEHICLES
    }
    return []
  }

  async createVehicle(veh: Partial<Vehicle>): Promise<Vehicle> {
    const newVeh: Vehicle = {
      id: `veh-${Date.now()}`,
      providerId: veh.providerId || 'prov-01',
      registrationNumber: veh.registrationNumber || 'REG-NEW',
      make: veh.make || 'Make',
      model: veh.model || 'Model',
      year: veh.year || 2024,
      category: veh.category || 'four_wheeler',
      subCategory: veh.subCategory || 'economy_sedan',
      seatingCapacity: veh.seatingCapacity || 5,
      luggageCapacityLarge: veh.luggageCapacityLarge || 2,
      luggageCapacitySmall: veh.luggageCapacitySmall || 2,
      transmission: veh.transmission || 'automatic',
      fuelType: veh.fuelType || 'petrol',
      driveTrain: veh.driveTrain || 'fwd',
      airConditioning: veh.airConditioning || 'climate_control',
      currentOdometerKm: veh.currentOdometerKm || 0,
      currentFuelLevelPercent: 100,
      activeStatus: 'active',
      isAvailableForRental: veh.isAvailableForRental ?? true,
      isAvailableWithDriver: veh.isAvailableWithDriver ?? true,
      dailyRate: veh.dailyRate || 65,
      depositAmount: veh.depositAmount || 200,
      photos: veh.photos || ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'],
      createdAt: new Date().toISOString(),
    }
    try {
      const res = await firstValueFrom(this.http.post<any>(`${this.baseUrl}/vehicles`, newVeh).pipe(catchError(() => of(null))))
      if (res) return res?.data ?? res
    } catch (_) {}
    if (!environment.production) {
      MOCK_VEHICLES.unshift(newVeh)
      return newVeh
    }
    throw new Error('Failed to register vehicle.')
  }

  // 2. Compliance
  async getComplianceDocs(vehicleId?: string): Promise<VehicleComplianceDoc[]> {
    return vehicleId ? MOCK_COMPLIANCE_DOCS.filter((d) => d.vehicleId === vehicleId) : MOCK_COMPLIANCE_DOCS
  }

  // 3. Pricing & Protection
  async getProtectionPlans(): Promise<VehicleProtectionPlan[]> {
    return MOCK_PROTECTION_PLANS
  }

  // 4. Drivers
  async getDrivers(): Promise<Driver[]> {
    return MOCK_DRIVERS
  }

  // 5. Transfer Routes
  async getTransferRoutes(): Promise<VehicleTransferRoute[]> {
    return MOCK_ROUTES
  }

  // 6. Bookings
  async getBookings(): Promise<VehicleBooking[]> {
    return MOCK_VEHICLE_BOOKINGS
  }

  async assignDriver(bookingId: string, driverId: string): Promise<boolean> {
    const bk = MOCK_VEHICLE_BOOKINGS.find((b) => b.id === bookingId)
    const drv = MOCK_DRIVERS.find((d) => d.id === driverId)
    if (bk && drv) {
      bk.driverId = drv.id
      bk.driverName = drv.fullName
      bk.bookingStatus = 'assigned'
      return true
    }
    return false
  }

  async startTrip(bookingId: string, otp: string): Promise<{ ok: boolean; message: string }> {
    const bk = MOCK_VEHICLE_BOOKINGS.find((b) => b.id === bookingId)
    if (!bk) return { ok: false, message: 'Booking not found' }
    if (bk.otpCode && bk.otpCode !== otp) {
      return { ok: false, message: 'Invalid passenger OTP code. Please re-verify.' }
    }
    bk.bookingStatus = 'in_progress'
    bk.startedAt = new Date().toISOString()
    return { ok: true, message: 'Trip verified & started successfully!' }
  }

  async completeTrip(bookingId: string): Promise<boolean> {
    const bk = MOCK_VEHICLE_BOOKINGS.find((b) => b.id === bookingId)
    if (bk) {
      bk.bookingStatus = 'completed'
      bk.completedAt = new Date().toISOString()
      return true
    }
    return false
  }

  // 7. Inspections & Damage
  async saveInspection(inspection: Omit<VehicleInspection, 'id' | 'inspectedAt'>): Promise<VehicleInspection> {
    const saved: VehicleInspection = {
      ...inspection,
      id: `insp-${Date.now()}`,
      inspectedAt: new Date().toISOString(),
      inspectionPdfUrl: 'https://media.travellerai.com/inspections/cert-demo.pdf',
    }
    return saved
  }

  // 8. Analytics
  async getAnalytics(): Promise<FleetAnalyticsSummary> {
    return {
      fleetUtilizationRatePercent: 82.5,
      fleetUtilizationChangePercent: 4.8,
      revenuePerVehicleDay: 88.4,
      activeTripsNowCount: 8,
      totalFleetCount: 42,
      availableVehiclesCount: 11,
      inMaintenanceCount: 2,
      expiringDocsIn60DaysCount: 3,
      damageIncidentRatePercent: 1.4,
      totalRentalRevenue: 64200,
    }
  }
}
