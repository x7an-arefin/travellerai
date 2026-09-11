import { z } from 'zod';


export const GetProviderQuotationInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetProviderQuotationInput = z.infer<typeof GetProviderQuotationInputSchema>;
