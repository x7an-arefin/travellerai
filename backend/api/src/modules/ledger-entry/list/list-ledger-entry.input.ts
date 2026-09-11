import { z } from 'zod';


export const ListLedgerEntryInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerId: z.string().optional(),
  userId: z.string().optional(),
  entryType: z.string().optional(),
  accountType: z.string().optional(),
  referenceType: z.string().optional(),

});


export type ListLedgerEntryInput = z.infer<typeof ListLedgerEntryInputSchema>;
