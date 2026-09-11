import type { CouponSelect, CouponInsert } from './coupon.schema.js';

export type CouponEntity = CouponSelect;

export type NewCoupon = CouponInsert;

export type UpdateCoupon = Partial<Omit<CouponEntity, 'id'>> & {
  id: string;
};

export interface ICouponRepository {
  findById(id: string): Promise<CouponEntity | null>;
  findAll(params: ListCouponParams): Promise<ListCouponResult>;
  create(data: NewCoupon): Promise<CouponEntity>;
  update(data: UpdateCoupon): Promise<CouponEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListCouponParams {
  cursor?: string;
  limit?: number;
  status?: string;
  discountType?: string;
  providerId?: string;

}

export interface ListCouponResult {
  items: CouponEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
