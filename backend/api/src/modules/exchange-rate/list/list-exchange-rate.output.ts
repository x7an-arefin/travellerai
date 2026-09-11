import { z } from 'zod';

const ExchangeRateBaseSchema = z.object({
  id: z.string(),
  fromCurrency: z.string(),
  toCurrency: z.string(),
  rate: z.string(),
  effectiveDate: z.date(),

});


export const ListExchangeRateOutputSchema = z.object({
  items: z.array(ExchangeRateBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListExchangeRateOutput = z.infer<typeof ListExchangeRateOutputSchema>;
