import type { KycDocumentSelect, KycDocumentInsert } from './kyc-document.schema.js';

export type KycDocumentEntity = KycDocumentSelect;

export type NewKycDocument = KycDocumentInsert;

export type UpdateKycDocument = Partial<Omit<KycDocumentEntity, 'id'>> & {
  id: string;
};

export interface IKycDocumentRepository {
  findById(id: string): Promise<KycDocumentEntity | null>;
  findAll(params: ListKycDocumentParams): Promise<ListKycDocumentResult>;
  create(data: NewKycDocument): Promise<KycDocumentEntity>;
  update(data: UpdateKycDocument): Promise<KycDocumentEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListKycDocumentParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  documentType?: string;
  status?: string;

}

export interface ListKycDocumentResult {
  items: KycDocumentEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
