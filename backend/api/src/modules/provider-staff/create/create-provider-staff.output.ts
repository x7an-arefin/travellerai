import { z } from 'zod';

const ProviderStaffBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  userId: z.string(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).nullable(),
  status: z.enum(['active', 'inactive', 'invited']).nullable(),

});


export const CreateProviderStaffOutputSchema = ProviderStaffBaseSchema;


export type CreateProviderStaffOutput = z.infer<typeof CreateProviderStaffOutputSchema>;
