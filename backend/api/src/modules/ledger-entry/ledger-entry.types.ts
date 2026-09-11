import type { LedgerEntrySelect, LedgerEntryInsert } from './ledger-entry.schema.js';

export type LedgerEntryEntity = LedgerEntrySelect;

export type NewLedgerEntry = LedgerEntryInsert;

export type UpdateLedgerEntry = Partial<Omit<LedgerEntryEntity, 'id'>> & {
  id: string;
};

export interface ILedgerEntryRepository {
  findById(id: string): Promise<LedgerEntryEntity | null>;
  findAll(params: ListLedgerEntryParams): Promise<ListLedgerEntryResult>;
  create(data: NewLedgerEntry): Promise<LedgerEntryEntity>;
  update(data: UpdateLedgerEntry): Promise<LedgerEntryEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListLedgerEntryParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  userId?: string;
  entryType?: string;
  accountType?: string;
  referenceType?: string;

}

export interface ListLedgerEntryResult {
  items: LedgerEntryEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
