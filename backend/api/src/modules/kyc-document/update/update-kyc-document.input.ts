import { z } from 'zod';


export const UpdateKycDocumentInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  documentType: z.enum(['trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address']).optional(),
  documentNumber: z.string().max(100).optional(),
  fileUrl: z.string().max(500).optional(),
  fileName: z.string().max(255).optional(),
  expiryDate: z.string().datetime().optional(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']).optional(),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateKycDocumentInput = z.infer<typeof UpdateKycDocumentInputSchema>;
