import { z } from 'zod';


export const ListProviderInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerType: z.string().optional(),
  approvalStatus: z.string().optional(),
  country: z.string().optional(),
  kycStatus: z.string().optional(),

});


export type ListProviderInput = z.infer<typeof ListProviderInputSchema>;
