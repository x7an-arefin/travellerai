import { z } from 'zod';


export const UpdateProviderStaffInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).optional(),
  permissions: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['active', 'inactive', 'invited']).optional(),
  invitedAt: z.string().datetime().optional(),
  acceptedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateProviderStaffInput = z.infer<typeof UpdateProviderStaffInputSchema>;
