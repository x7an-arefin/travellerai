import { z } from 'zod';

const KycDocumentBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  documentType: z.enum(['trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address']).nullable(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']).nullable(),

});


export const CreateKycDocumentOutputSchema = KycDocumentBaseSchema;


export type CreateKycDocumentOutput = z.infer<typeof CreateKycDocumentOutputSchema>;
