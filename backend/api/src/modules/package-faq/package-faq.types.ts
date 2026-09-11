import type { PackageFaqSelect, PackageFaqInsert } from './package-faq.schema.js';

export type PackageFaqEntity = PackageFaqSelect;

export type NewPackageFaq = PackageFaqInsert;

export type UpdatePackageFaq = Partial<Omit<PackageFaqEntity, 'id'>> & {
  id: string;
};

export interface IPackageFaqRepository {
  findById(id: string): Promise<PackageFaqEntity | null>;
  findAll(params: ListPackageFaqParams): Promise<ListPackageFaqResult>;
  create(data: NewPackageFaq): Promise<PackageFaqEntity>;
  update(data: UpdatePackageFaq): Promise<PackageFaqEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPackageFaqParams {
  cursor?: string;
  limit?: number;
  packageId?: string;

}

export interface ListPackageFaqResult {
  items: PackageFaqEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
