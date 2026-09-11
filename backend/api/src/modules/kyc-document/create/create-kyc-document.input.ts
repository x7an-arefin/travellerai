import { z } from 'zod';


export const CreateKycDocumentInputSchema = z.object({
  providerId: z.string().uuid(),
  documentType: z.enum(['trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address']).optional().default('trade_license'),
  documentNumber: z.string().max(100).optional(),
  fileUrl: z.string().max(500),
  fileName: z.string().max(255).optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']).optional().default('draft'),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateKycDocumentInput = z.infer<typeof CreateKycDocumentInputSchema>;
