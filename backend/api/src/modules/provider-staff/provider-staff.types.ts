import type { ProviderStaffSelect, ProviderStaffInsert } from './provider-staff.schema.js';

export type ProviderStaffEntity = ProviderStaffSelect;

export type NewProviderStaff = ProviderStaffInsert;

export type UpdateProviderStaff = Partial<Omit<ProviderStaffEntity, 'id'>> & {
  id: string;
};

export interface IProviderStaffRepository {
  findById(id: string): Promise<ProviderStaffEntity | null>;
  findAll(params: ListProviderStaffParams): Promise<ListProviderStaffResult>;
  create(data: NewProviderStaff): Promise<ProviderStaffEntity>;
  update(data: UpdateProviderStaff): Promise<ProviderStaffEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListProviderStaffParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  role?: string;
  status?: string;

}

export interface ListProviderStaffResult {
  items: ProviderStaffEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
