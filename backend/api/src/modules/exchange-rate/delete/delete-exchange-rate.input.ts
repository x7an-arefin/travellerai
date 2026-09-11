import { z } from 'zod';


export const DeleteExchangeRateInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteExchangeRateInput = z.infer<typeof DeleteExchangeRateInputSchema>;
