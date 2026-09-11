import type { WithdrawalRequestSelect, WithdrawalRequestInsert } from './withdrawal-request.schema.js';

export type WithdrawalRequestEntity = WithdrawalRequestSelect;

export type NewWithdrawalRequest = WithdrawalRequestInsert;

export type UpdateWithdrawalRequest = Partial<Omit<WithdrawalRequestEntity, 'id'>> & {
  id: string;
};

export interface IWithdrawalRequestRepository {
  findById(id: string): Promise<WithdrawalRequestEntity | null>;
  findAll(params: ListWithdrawalRequestParams): Promise<ListWithdrawalRequestResult>;
  create(data: NewWithdrawalRequest): Promise<WithdrawalRequestEntity>;
  update(data: UpdateWithdrawalRequest): Promise<WithdrawalRequestEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListWithdrawalRequestParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  status?: string;

}

export interface ListWithdrawalRequestResult {
  items: WithdrawalRequestEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
