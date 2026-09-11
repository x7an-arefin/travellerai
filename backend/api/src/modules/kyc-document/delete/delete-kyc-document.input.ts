import { z } from 'zod';


export const DeleteKycDocumentInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteKycDocumentInput = z.infer<typeof DeleteKycDocumentInputSchema>;
