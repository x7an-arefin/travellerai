import { z } from 'zod';

const KycDocumentBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  fileUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteKycDocumentOutputSchema = KycDocumentBaseSchema;


export type DeleteKycDocumentOutput = z.infer<typeof DeleteKycDocumentOutputSchema>;
