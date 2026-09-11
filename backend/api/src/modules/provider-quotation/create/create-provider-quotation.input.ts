import { z } from 'zod';


export const CreateProviderQuotationInputSchema = z.object({
  inquiryId: z.string().uuid(),
  providerId: z.string().uuid(),
  title: z.string().max(300),
  itineraryDetails: z.record(z.string(), z.unknown()).optional(),
  inclusions: z.record(z.string(), z.unknown()).optional(),
  exclusions: z.record(z.string(), z.unknown()).optional(),
  totalPrice: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  terms: z.string().optional(),
  validUntil: z.string().datetime(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).optional().default('draft'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateProviderQuotationInput = z.infer<typeof CreateProviderQuotationInputSchema>;
