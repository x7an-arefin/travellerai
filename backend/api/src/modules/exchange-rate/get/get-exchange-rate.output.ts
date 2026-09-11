import { z } from 'zod';

const ExchangeRateBaseSchema = z.object({
  id: z.string(),
  fromCurrency: z.string(),
  toCurrency: z.string(),
  rate: z.string(),
  source: z.string().nullable(),
  effectiveDate: z.date(),
  isManualOverride: z.boolean().nullable(),

});


export const GetExchangeRateOutputSchema = ExchangeRateBaseSchema;


export type GetExchangeRateOutput = z.infer<typeof GetExchangeRateOutputSchema>;
