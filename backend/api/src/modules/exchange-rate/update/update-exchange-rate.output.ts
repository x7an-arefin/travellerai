import { z } from 'zod';

const ExchangeRateBaseSchema = z.object({
  id: z.string(),
  rate: z.string(),
  isManualOverride: z.boolean().nullable(),

});


export const UpdateExchangeRateOutputSchema = ExchangeRateBaseSchema;


export type UpdateExchangeRateOutput = z.infer<typeof UpdateExchangeRateOutputSchema>;
