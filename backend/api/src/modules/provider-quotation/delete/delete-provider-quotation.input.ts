import { z } from 'zod';


export const DeleteProviderQuotationInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteProviderQuotationInput = z.infer<typeof DeleteProviderQuotationInputSchema>;
