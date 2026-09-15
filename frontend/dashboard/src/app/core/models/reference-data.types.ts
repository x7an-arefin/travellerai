export interface HotelOption {
  id: string
  name: string
  city: string
  country?: string
  starRating?: number
  propertyType?: string
}

export interface VehicleOption {
  id: string
  make: string
  model: string
  registrationNumber: string
  category?: string
  capacity?: number
  status?: string
}

export interface DriverOption {
  id: string
  fullName: string
  licenseNumber?: string
  dutyStatus: string
  phone?: string
}

export interface PackageOption {
  id: string
  title: string
  destinationId?: string
  durationDays?: number
  basePrice?: number
}

export interface DestinationOption {
  id: string
  name: string
  country: string
  region?: string
}

export interface ProviderOption {
  id: string
  name: string
  slug: string
  type: string
  status: string
}

export interface CategoryOption {
  id: string
  name: string
  slug: string
}

export interface DepartureOption {
  id: string
  packageId?: string
  departureCode: string
  startDate?: string
  availableCount: number
  status: string
}

export interface SelectOption {
  label: string
  value: string
}
