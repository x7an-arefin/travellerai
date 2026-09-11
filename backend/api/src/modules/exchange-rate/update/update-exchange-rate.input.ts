import { z } from 'zod';


export const UpdateExchangeRateInputSchema = z.object({
  fromCurrency: z.string().max(3).optional(),
  toCurrency: z.string().max(3).optional(),
  rate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  source: z.string().max(50).optional(),
  effectiveDate: z.string().datetime().optional(),
  isManualOverride: z.boolean().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateExchangeRateInput = z.infer<typeof UpdateExchangeRateInputSchema>;
