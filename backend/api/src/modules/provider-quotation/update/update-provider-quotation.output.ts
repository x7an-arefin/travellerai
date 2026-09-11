import { z } from 'zod';

const ProviderQuotationBaseSchema = z.object({
  id: z.string(),
  validUntil: z.date(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).nullable(),

});


export const UpdateProviderQuotationOutputSchema = ProviderQuotationBaseSchema;


export type UpdateProviderQuotationOutput = z.infer<typeof UpdateProviderQuotationOutputSchema>;
