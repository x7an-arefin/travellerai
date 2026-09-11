import { z } from 'zod';

const ProviderQuotationBaseSchema = z.object({
  id: z.string(),
  inquiryId: z.string(),
  providerId: z.string(),
  title: z.string(),
  totalPrice: z.string(),
  currency: z.string(),
  validUntil: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteProviderQuotationOutputSchema = ProviderQuotationBaseSchema;


export type DeleteProviderQuotationOutput = z.infer<typeof DeleteProviderQuotationOutputSchema>;
