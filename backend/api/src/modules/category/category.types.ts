import type { CategorySelect, CategoryInsert } from './category.schema.js';

export type CategoryEntity = CategorySelect;

export type NewCategory = CategoryInsert;

export type UpdateCategory = Partial<Omit<CategoryEntity, 'id'>> & {
  id: string;
};

export interface ICategoryRepository {
  findById(id: string): Promise<CategoryEntity | null>;
  findAll(params: ListCategoryParams): Promise<ListCategoryResult>;
  create(data: NewCategory): Promise<CategoryEntity>;
  update(data: UpdateCategory): Promise<CategoryEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListCategoryParams {
  cursor?: string;
  limit?: number;
  parentId?: string;
  status?: string;

}

export interface ListCategoryResult {
  items: CategoryEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
