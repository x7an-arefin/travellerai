import { CartItemType } from '../../../checkout/data-access/models/cart.model'


export interface SearchExperienceItem {
  id: string
  type: CartItemType
  title: string
  subtitle: string
  destination: string
  imageUrl: string
  rating: number
  reviewCount: number
  providerName: string
  basePrice: number
  priceSuffix: string
  highlights: string[]
  isFeatured?: boolean
  freeCancellation: boolean
  securityDeposit?: number
}

export interface SearchFilterParams {
  query?: string
  serviceType?: string
  destination?: string
  minRating?: number
  maxPrice?: number
  onlyInstantConfirmation?: boolean
  onlyFreeCancellation?: boolean
}

export interface SearchCatalogResponse {
  items: SearchExperienceItem[]
  total: number
}
