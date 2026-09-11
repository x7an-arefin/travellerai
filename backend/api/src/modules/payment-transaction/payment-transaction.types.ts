import type { PaymentTransactionSelect, PaymentTransactionInsert } from './payment-transaction.schema.js';

export type PaymentTransactionEntity = PaymentTransactionSelect;

export type NewPaymentTransaction = PaymentTransactionInsert;

export type UpdatePaymentTransaction = Partial<Omit<PaymentTransactionEntity, 'id'>> & {
  id: string;
};

export interface IPaymentTransactionRepository {
  findById(id: string): Promise<PaymentTransactionEntity | null>;
  findAll(params: ListPaymentTransactionParams): Promise<ListPaymentTransactionResult>;
  create(data: NewPaymentTransaction): Promise<PaymentTransactionEntity>;
  update(data: UpdatePaymentTransaction): Promise<PaymentTransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPaymentTransactionParams {
  cursor?: string;
  limit?: number;
  bookingId?: string;
  gateway?: string;
  status?: string;
  transactionType?: string;

}

export interface ListPaymentTransactionResult {
  items: PaymentTransactionEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
