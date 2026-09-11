import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  bigint,
  decimal,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const documentTypeEnum = pgEnum('kyc_documents_document_type', ['trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address']);

export const statusEnum = pgEnum('kyc_documents_status', ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']);


export const kycDocumentTable = pgTable(
  'kyc_documents',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    documentType: documentTypeEnum('document_type').default('trade_license'),
    documentNumber: varchar("document_number", { length: 100 }),
    fileUrl: varchar("file_url", { length: 500 }).notNull(),
    fileName: varchar("file_name", { length: 255 }),
    expiryDate: timestamp("expiry_date", { withTimezone: true }),
    status: statusEnum('status').default('draft'),
    reviewNotes: text("review_notes"),
    reviewedBy: uuid("reviewed_by"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    kyc_documents_provider_idx: index('kyc_documents_provider_idx').on(table.providerId, table.status),
    kyc_documents_type_idx: index('kyc_documents_type_idx').on(table.documentType, table.status),
  })
);

export type KycDocumentInsert = typeof kycDocumentTable.$inferInsert;
export type KycDocumentSelect = typeof kycDocumentTable.$inferSelect;
