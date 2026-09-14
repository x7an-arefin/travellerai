export type VehicleCategory = 'four_wheeler' | 'two_wheeler' | 'three_wheeler_cng'

export type VehicleSubCategory =
  | 'economy_sedan'
  | 'compact_hatchback'
  | 'midsize_sedan'
  | 'premium_sedan'
  | 'compact_suv'
  | 'fullsize_suv_4x4'
  | 'luxury_suv'
  | 'minivan'
  | 'minibus'
  | 'tourist_microbus'
  | 'tourist_coach'
  | 'commuter_scooter'
  | 'premium_scooter'
  | 'adventure_touring_bike'
  | 'electric_scooter'
  | 'electric_bicycle'
  | 'cng_auto_rickshaw'
  | 'tuktuk_rickshaw'
  | 'electric_easy_bike'

export type RentalModel = 'self_drive' | 'with_driver' | 'both'

export type VehicleServiceType =
  | 'self_drive_rental'
  | 'airport_transfer_arrival'
  | 'airport_transfer_departure'
  | 'intercity_transfer'
  | 'hourly_city_charter'
  | 'full_day_tour'
  | 'multi_day_outstation'

export type VehicleBookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'assigned'
  | 'en_route_to_pickup'
  | 'arrived_at_pickup'
  | 'in_progress'
  | 'returned'
  | 'completed'
  | 'cancelled'

export type DriverDutyStatus = 'available' | 'on_trip' | 'off_duty' | 'suspended'

export interface DamageMarker {
  id: string
  zone: 'front_bumper' | 'rear_bumper' | 'hood_bonnet' | 'roof' | 'left_doors' | 'right_doors' | 'windshield_glass' | 'wheels_tires'
  x: number // percentage 0-100
  y: number // percentage 0-100
  damageType: 'scratch' | 'dent' | 'crack' | 'chip' | 'discoloration'
  severity: 'minor' | 'moderate' | 'severe'
  photoUrl?: string
  notes?: string
}

export interface Vehicle {
  id: string
  providerId: string
  registrationNumber: string
  vinNumber?: string
  make: string
  model: string
  year: number
  category: VehicleCategory
  subCategory: VehicleSubCategory
  seatingCapacity: number
  luggageCapacityLarge: number
  luggageCapacitySmall: number
  transmission: 'automatic' | 'manual' | 'direct_drive'
  fuelType: 'petrol' | 'octane' | 'diesel' | 'hybrid_petrol' | 'hybrid_diesel' | 'full_electric' | 'cng' | 'lpg'
  driveTrain: 'fwd' | 'rwd' | 'awd_4x4'
  color?: string
  airConditioning: 'climate_control' | 'manual_ac' | 'none'
  engineDisplacementCc?: number
  currentOdometerKm: number
  currentFuelLevelPercent: number
  cngCylinderTestExpiry?: string
  activeStatus: 'active' | 'maintenance' | 'compliance_hold' | 'retired' | 'inactive'
  isAvailableForRental: boolean
  isAvailableWithDriver: boolean
  currentLocationAddress?: string
  latitude?: number
  longitude?: number
  photos?: string[]
  features?: string[]
  dailyRate?: number
  hourlyRate?: number
  depositAmount?: number
  createdAt: string
  updatedAt?: string
}

export interface VehicleComplianceDoc {
  id: string
  vehicleId: string
  documentType: 'registration_card' | 'insurance_policy' | 'fitness_certificate' | 'commercial_permit' | 'cng_cylinder_test' | 'tax_token' | 'emission_certificate'
  documentNumber: string
  issuedDate?: string
  expiryDate: string
  documentFileUrl: string
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'expired'
  verifiedBy?: string
  verifiedAt?: string
  notes?: string
}

export interface VehiclePricingPlan {
  id: string
  vehicleId: string
  rentalModel: RentalModel
  baseHourlyRate?: number
  baseDailyRate: number
  weeklyRate?: number
  depositAmount: number
  freeKmPerDay: number
  excessKmRate: number
  fuelPolicyCode: 'full_to_full' | 'same_to_same' | 'pre_purchase_full' | 'provider_filled'
  isB2BExclusive: boolean
  isActive: boolean
}

export interface VehicleProtectionPlan {
  id: string
  planCode: 'basic_liability' | 'collision_damage_waiver' | 'loss_damage_waiver' | 'full_damage_waiver' | 'roadside_assistance'
  name: string
  description?: string
  dailyRate: number
  collisionDeductibleAmount: number
  theftDeductibleAmount: number
  glassTireCovered: boolean
  roadsideAssistanceCovered: boolean
  isActive: boolean
}

export interface Driver {
  id: string
  providerId: string
  userId?: string
  fullName: string
  phone: string
  email?: string
  licenseNumber: string
  licenseCategory: string
  licenseExpiryDate: string
  driverPhotoUrl?: string
  yearsOfExperience: number
  assignedVehicleId?: string
  assignedVehicleName?: string
  dutyStatus: DriverDutyStatus
  currentLatitude?: number
  currentLongitude?: number
  overallRating: number
  completedTripsCount: number
  isVerified: boolean
  createdAt: string
}

export interface VehicleBooking {
  id: string
  bookingReference: string
  travelerId?: string
  providerId: string
  vehicleId?: string
  vehicleName?: string
  driverId?: string
  driverName?: string
  rentalModel: RentalModel
  serviceType: VehicleServiceType
  pickupDateTime: string
  returnDateTime: string
  pickupLocationAddress: string
  dropoffLocationAddress?: string
  flightNumber?: string
  flightEta?: string
  flightStatus?: 'on_time' | 'delayed' | 'landed' | 'diverted'
  passengerCount: number
  bookingStatus: VehicleBookingStatus
  baseRentalAmount: number
  extrasAmount: number
  protectionPlanAmount: number
  protectionPlanName?: string
  driverAllowanceAmount: number
  taxAmount: number
  totalAmount: number
  securityDepositAmount: number
  depositHoldStatus: 'none' | 'authorized' | 'captured' | 'partial_released' | 'fully_released' | 'forfeited'
  commissionAmount: number
  netProviderAmount: number
  paymentStatus: 'pending' | 'authorized' | 'paid' | 'refunded'
  otpCode?: string
  qrCode?: string
  startedAt?: string
  completedAt?: string
  createdAt: string
}

export interface VehicleInspection {
  id: string
  vehicleBookingId: string
  vehicleId: string
  inspectionType: 'pre_handover' | 'post_return'
  odometerKm: number
  fuelPercent: number
  cngPressureBar?: number
  damageMarkers: DamageMarker[]
  generalNotes?: string
  photoUrls?: string[]
  customerSignatureUrl?: string
  inspectorSignatureUrl?: string
  inspectionPdfUrl?: string
  inspectedAt: string
}

export interface VehicleTransferRoute {
  id: string
  providerId: string
  originName: string
  destinationName: string
  distanceKm: number
  estimatedDurationMinutes: number
  vehicleCategory: string
  fixedFareAmount: number
  driverAllowanceAmount: number
  tollIncluded: boolean
  isActive: boolean
}

export interface FleetAnalyticsSummary {
  fleetUtilizationRatePercent: number
  fleetUtilizationChangePercent: number
  revenuePerVehicleDay: number
  activeTripsNowCount: number
  totalFleetCount: number
  availableVehiclesCount: number
  inMaintenanceCount: number
  expiringDocsIn60DaysCount: number
  damageIncidentRatePercent: number
  totalRentalRevenue: number
}
