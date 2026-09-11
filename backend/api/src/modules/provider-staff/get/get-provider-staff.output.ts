import { z } from 'zod';

const ProviderStaffBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  userId: z.string(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).nullable(),
  permissions: z.record(z.string(), z.unknown()).nullable(),
  status: z.enum(['active', 'inactive', 'invited']).nullable(),
  invitedAt: z.date().nullable(),
  acceptedAt: z.date().nullable(),

});


export const GetProviderStaffOutputSchema = ProviderStaffBaseSchema;


export type GetProviderStaffOutput = z.infer<typeof GetProviderStaffOutputSchema>;
