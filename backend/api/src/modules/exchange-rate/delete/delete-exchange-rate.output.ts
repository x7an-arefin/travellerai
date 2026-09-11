import { z } from 'zod';

const ExchangeRateBaseSchema = z.object({
  id: z.string(),
  fromCurrency: z.string(),
  toCurrency: z.string(),
  rate: z.string(),
  effectiveDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteExchangeRateOutputSchema = ExchangeRateBaseSchema;


export type DeleteExchangeRateOutput = z.infer<typeof DeleteExchangeRateOutputSchema>;
