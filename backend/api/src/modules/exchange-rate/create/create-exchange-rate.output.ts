import { z } from 'zod';

const ExchangeRateBaseSchema = z.object({
  id: z.string(),
  fromCurrency: z.string(),
  toCurrency: z.string(),
  rate: z.string(),
  effectiveDate: z.date(),

});


export const CreateExchangeRateOutputSchema = ExchangeRateBaseSchema;


export type CreateExchangeRateOutput = z.infer<typeof CreateExchangeRateOutputSchema>;
