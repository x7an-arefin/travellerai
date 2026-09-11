import { z } from 'zod';

const ProviderQuotationBaseSchema = z.object({
  id: z.string(),
  inquiryId: z.string(),
  providerId: z.string(),
  title: z.string(),
  totalPrice: z.string(),
  currency: z.string(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).nullable(),

});


export const CreateProviderQuotationOutputSchema = ProviderQuotationBaseSchema;


export type CreateProviderQuotationOutput = z.infer<typeof CreateProviderQuotationOutputSchema>;
