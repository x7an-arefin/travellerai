import { z } from 'zod';

const ProviderQuotationBaseSchema = z.object({
  id: z.string(),
  inquiryId: z.string(),
  providerId: z.string(),
  title: z.string(),
  itineraryDetails: z.record(z.string(), z.unknown()).nullable(),
  inclusions: z.record(z.string(), z.unknown()).nullable(),
  exclusions: z.record(z.string(), z.unknown()).nullable(),
  totalPrice: z.string(),
  currency: z.string(),
  depositAmount: z.string().nullable(),
  terms: z.string().nullable(),
  validUntil: z.date(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).nullable(),

});


export const GetProviderQuotationOutputSchema = ProviderQuotationBaseSchema;


export type GetProviderQuotationOutput = z.infer<typeof GetProviderQuotationOutputSchema>;
