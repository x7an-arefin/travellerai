import type { RefundRequestSelect, RefundRequestInsert } from './refund-request.schema.js';

export type RefundRequestEntity = RefundRequestSelect;

export type NewRefundRequest = RefundRequestInsert;

export type UpdateRefundRequest = Partial<Omit<RefundRequestEntity, 'id'>> & {
  id: string;
};

export interface IRefundRequestRepository {
  findById(id: string): Promise<RefundRequestEntity | null>;
  findAll(params: ListRefundRequestParams): Promise<ListRefundRequestResult>;
  create(data: NewRefundRequest): Promise<RefundRequestEntity>;
  update(data: UpdateRefundRequest): Promise<RefundRequestEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListRefundRequestParams {
  cursor?: string;
  limit?: number;
  bookingId?: string;
  initiatedBy?: string;
  status?: string;
  refundMethod?: string;

}

export interface ListRefundRequestResult {
  items: RefundRequestEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
