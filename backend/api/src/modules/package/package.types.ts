import type { PackageSelect, PackageInsert } from './package.schema.js';

export type PackageEntity = PackageSelect;

export type NewPackage = PackageInsert;

export type UpdatePackage = Partial<Omit<PackageEntity, 'id'>> & {
  id: string;
};

export interface IPackageRepository {
  findById(id: string): Promise<PackageEntity | null>;
  findAll(params: ListPackageParams): Promise<ListPackageResult>;
  create(data: NewPackage): Promise<PackageEntity>;
  update(data: UpdatePackage): Promise<PackageEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPackageParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  categoryId?: string;
  destinationId?: string;
  productType?: string;
  status?: string;
  isFeatured?: string;
  difficultyLevel?: string;
  confirmationType?: string;

}

export interface ListPackageResult {
  items: PackageEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
