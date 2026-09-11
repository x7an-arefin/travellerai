import { z } from 'zod';

const ProviderStaffBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteProviderStaffOutputSchema = ProviderStaffBaseSchema;


export type DeleteProviderStaffOutput = z.infer<typeof DeleteProviderStaffOutputSchema>;
