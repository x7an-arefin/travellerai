import { z } from 'zod';


export const UpdateProviderQuotationInputSchema = z.object({
  inquiryId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  title: z.string().max(300).optional(),
  itineraryDetails: z.record(z.string(), z.unknown()).optional(),
  inclusions: z.record(z.string(), z.unknown()).optional(),
  exclusions: z.record(z.string(), z.unknown()).optional(),
  totalPrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  terms: z.string().optional(),
  validUntil: z.string().datetime().optional(),
  status: z.enum(['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateProviderQuotationInput = z.infer<typeof UpdateProviderQuotationInputSchema>;
