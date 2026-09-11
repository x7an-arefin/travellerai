import type { PackageAddonSelect, PackageAddonInsert } from './package-addon.schema.js';

export type PackageAddonEntity = PackageAddonSelect;

export type NewPackageAddon = PackageAddonInsert;

export type UpdatePackageAddon = Partial<Omit<PackageAddonEntity, 'id'>> & {
  id: string;
};

export interface IPackageAddonRepository {
  findById(id: string): Promise<PackageAddonEntity | null>;
  findAll(params: ListPackageAddonParams): Promise<ListPackageAddonResult>;
  create(data: NewPackageAddon): Promise<PackageAddonEntity>;
  update(data: UpdatePackageAddon): Promise<PackageAddonEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPackageAddonParams {
  cursor?: string;
  limit?: number;
  packageId?: string;
  status?: string;

}

export interface ListPackageAddonResult {
  items: PackageAddonEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
