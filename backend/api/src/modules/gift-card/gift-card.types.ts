import type { GiftCardSelect, GiftCardInsert } from './gift-card.schema.js';

export type GiftCardEntity = GiftCardSelect;

export type NewGiftCard = GiftCardInsert;

export type UpdateGiftCard = Partial<Omit<GiftCardEntity, 'id'>> & {
  id: string;
};

export interface IGiftCardRepository {
  findById(id: string): Promise<GiftCardEntity | null>;
  findAll(params: ListGiftCardParams): Promise<ListGiftCardResult>;
  create(data: NewGiftCard): Promise<GiftCardEntity>;
  update(data: UpdateGiftCard): Promise<GiftCardEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListGiftCardParams {
  cursor?: string;
  limit?: number;
  purchaserId?: string;
  status?: string;

}

export interface ListGiftCardResult {
  items: GiftCardEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
