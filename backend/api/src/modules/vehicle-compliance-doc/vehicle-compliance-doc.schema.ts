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

export const documentTypeEnum = pgEnum('vehicle_compliance_docs_document_type', ['registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate']);

export const verificationStatusEnum = pgEnum('vehicle_compliance_docs_verification_status', ['pending', 'verified', 'rejected', 'expired']);


export const vehicleComplianceDocTable = pgTable(
  'vehicle_compliance_docs',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleId: uuid("vehicle_id").notNull(),
    documentType: documentTypeEnum('document_type').default('registration_card'),
    documentNumber: varchar("document_number", { length: 100 }).notNull(),
    issuedDate: varchar("issued_date", { length: 10 }),
    expiryDate: varchar("expiry_date", { length: 10 }).notNull(),
    documentFileUrl: varchar("document_file_url", { length: 500 }).notNull(),
    verificationStatus: verificationStatusEnum('verification_status').default('pending'),
    verifiedBy: uuid("verified_by"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_compliance_docs_vehicle_idx: index('vehicle_compliance_docs_vehicle_idx').on(table.vehicleId),
    vehicle_compliance_docs_expiry_idx: index('vehicle_compliance_docs_expiry_idx').on(table.expiryDate),
  })
);

export type VehicleComplianceDocInsert = typeof vehicleComplianceDocTable.$inferInsert;
export type VehicleComplianceDocSelect = typeof vehicleComplianceDocTable.$inferSelect;
