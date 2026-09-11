import { z } from 'zod';

const KycDocumentBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  documentType: z.enum(['trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address']).nullable(),
  documentNumber: z.string().nullable(),
  fileUrl: z.string(),
  expiryDate: z.date().nullable(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']).nullable(),
  reviewNotes: z.string().nullable(),
  reviewedAt: z.date().nullable(),

});


export const GetKycDocumentOutputSchema = KycDocumentBaseSchema;


export type GetKycDocumentOutput = z.infer<typeof GetKycDocumentOutputSchema>;
