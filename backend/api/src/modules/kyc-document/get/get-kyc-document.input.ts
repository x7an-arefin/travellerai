import { z } from 'zod';


export const GetKycDocumentInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetKycDocumentInput = z.infer<typeof GetKycDocumentInputSchema>;
