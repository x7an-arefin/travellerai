import { z } from 'zod';


export const ListProviderStaffInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  providerId: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),

});


export type ListProviderStaffInput = z.infer<typeof ListProviderStaffInputSchema>;
