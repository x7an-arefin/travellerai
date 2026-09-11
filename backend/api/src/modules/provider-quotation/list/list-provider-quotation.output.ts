import { z } from 'zod';

const ProviderQuotationBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  title: z.string(),
  totalPrice: z.string(),
  currency: z.string(),
  validUntil: z.date(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).nullable(),

});


export const ListProviderQuotationOutputSchema = z.object({
  items: z.array(ProviderQuotationBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListProviderQuotationOutput = z.infer<typeof ListProviderQuotationOutputSchema>;
