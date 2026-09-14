import { Category } from './categories.model'

export type NewCategory = Omit<Category, 'id' | 'createdAt' | 'packageCount'>
export type UpdateCategory = Partial<NewCategory>

export interface CategoryListResponse {
  items: Category[]
  total?: number
}
