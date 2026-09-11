import { z } from 'zod';


export const ListKycDocumentInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  providerId: z.string().optional(),
  documentType: z.string().optional(),
  status: z.string().optional(),

});


export type ListKycDocumentInput = z.infer<typeof ListKycDocumentInputSchema>;
