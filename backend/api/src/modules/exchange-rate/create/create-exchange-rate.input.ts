import { z } from 'zod';


export const CreateExchangeRateInputSchema = z.object({
  fromCurrency: z.string().max(3),
  toCurrency: z.string().max(3),
  rate: z.string().regex(/^\d+(\.\d+)?$/),
  source: z.string().max(50).optional(),
  effectiveDate: z.string().datetime(),
  isManualOverride: z.boolean().optional().default(false),

});



export type CreateExchangeRateInput = z.infer<typeof CreateExchangeRateInputSchema>;
