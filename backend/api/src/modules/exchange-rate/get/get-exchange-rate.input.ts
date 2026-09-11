import { z } from 'zod';


export const GetExchangeRateInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetExchangeRateInput = z.infer<typeof GetExchangeRateInputSchema>;
