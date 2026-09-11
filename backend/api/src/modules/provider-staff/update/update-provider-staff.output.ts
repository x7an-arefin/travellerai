import { z } from 'zod';

const ProviderStaffBaseSchema = z.object({
  id: z.string(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).nullable(),
  permissions: z.record(z.string(), z.unknown()).nullable(),
  status: z.enum(['active', 'inactive', 'invited']).nullable(),

});


export const UpdateProviderStaffOutputSchema = ProviderStaffBaseSchema;


export type UpdateProviderStaffOutput = z.infer<typeof UpdateProviderStaffOutputSchema>;
