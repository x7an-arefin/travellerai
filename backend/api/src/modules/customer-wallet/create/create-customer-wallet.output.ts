import { z } from 'zod';

const CustomerWalletBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  availableBalance: z.string().nullable(),
  currency: z.string(),
  status: z.enum(['active', 'frozen']).nullable(),

});


export const CreateCustomerWalletOutputSchema = CustomerWalletBaseSchema;


export type CreateCustomerWalletOutput = z.infer<typeof CreateCustomerWalletOutputSchema>;
