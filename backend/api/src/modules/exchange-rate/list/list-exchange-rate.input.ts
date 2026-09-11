import { z } from 'zod';


export const ListExchangeRateInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional().default(100),
  fromCurrency: z.string().optional(),
  toCurrency: z.string().optional(),

});


export type ListExchangeRateInput = z.infer<typeof ListExchangeRateInputSchema>;
