import { z } from 'zod';

const CustomerWalletBaseSchema = z.object({
  id: z.string(),
  availableBalance: z.string().nullable(),
  status: z.enum(['active', 'frozen']).nullable(),

});


export const UpdateCustomerWalletOutputSchema = CustomerWalletBaseSchema;


export type UpdateCustomerWalletOutput = z.infer<typeof UpdateCustomerWalletOutputSchema>;
