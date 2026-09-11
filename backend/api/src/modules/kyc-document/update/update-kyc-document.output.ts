import { z } from 'zod';

const KycDocumentBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired']).nullable(),
  reviewNotes: z.string().nullable(),
  reviewedAt: z.date().nullable(),

});


export const UpdateKycDocumentOutputSchema = KycDocumentBaseSchema;


export type UpdateKycDocumentOutput = z.infer<typeof UpdateKycDocumentOutputSchema>;
