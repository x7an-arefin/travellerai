import type { GuideProfileSelect, GuideProfileInsert } from './guide-profile.schema.js';

export type GuideProfileEntity = GuideProfileSelect;

export type NewGuideProfile = GuideProfileInsert;

export type UpdateGuideProfile = Partial<Omit<GuideProfileEntity, 'id'>> & {
  id: string;
};

export interface IGuideProfileRepository {
  findById(id: string): Promise<GuideProfileEntity | null>;
  findAll(params: ListGuideProfileParams): Promise<ListGuideProfileResult>;
  create(data: NewGuideProfile): Promise<GuideProfileEntity>;
  update(data: UpdateGuideProfile): Promise<GuideProfileEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListGuideProfileParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  isAvailable?: string;
  status?: string;

}

export interface ListGuideProfileResult {
  items: GuideProfileEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
