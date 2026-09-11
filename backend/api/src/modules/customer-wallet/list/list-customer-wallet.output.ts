import { z } from 'zod';

const CustomerWalletBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  availableBalance: z.string().nullable(),
  currency: z.string(),
  status: z.enum(['active', 'frozen']).nullable(),

});


export const ListCustomerWalletOutputSchema = z.object({
  items: z.array(CustomerWalletBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListCustomerWalletOutput = z.infer<typeof ListCustomerWalletOutputSchema>;
