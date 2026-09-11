import { z } from 'zod';


export const ListProviderQuotationInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  inquiryId: z.string().optional(),
  providerId: z.string().optional(),
  status: z.string().optional(),

});


export type ListProviderQuotationInput = z.infer<typeof ListProviderQuotationInputSchema>;
