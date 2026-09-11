import { z } from 'zod';

const ProviderStaffBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  userId: z.string(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).nullable(),
  status: z.enum(['active', 'inactive', 'invited']).nullable(),

});


export const ListProviderStaffOutputSchema = z.object({
  items: z.array(ProviderStaffBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListProviderStaffOutput = z.infer<typeof ListProviderStaffOutputSchema>;
