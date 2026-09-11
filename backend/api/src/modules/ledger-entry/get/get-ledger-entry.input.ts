import { z } from 'zod';


export const GetLedgerEntryInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetLedgerEntryInput = z.infer<typeof GetLedgerEntryInputSchema>;
