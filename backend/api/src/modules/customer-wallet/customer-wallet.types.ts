import type { CustomerWalletSelect, CustomerWalletInsert } from './customer-wallet.schema.js';

export type CustomerWalletEntity = CustomerWalletSelect;

export type NewCustomerWallet = CustomerWalletInsert;

export type UpdateCustomerWallet = Partial<Omit<CustomerWalletEntity, 'id'>> & {
  id: string;
};

export interface ICustomerWalletRepository {
  findById(id: string): Promise<CustomerWalletEntity | null>;
  findAll(params: ListCustomerWalletParams): Promise<ListCustomerWalletResult>;
  create(data: NewCustomerWallet): Promise<CustomerWalletEntity>;
  update(data: UpdateCustomerWallet): Promise<CustomerWalletEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListCustomerWalletParams {
  cursor?: string;
  limit?: number;
  userId?: string;
  status?: string;

}

export interface ListCustomerWalletResult {
  items: CustomerWalletEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
