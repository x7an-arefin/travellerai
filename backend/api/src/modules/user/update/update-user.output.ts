import { z } from 'zod';

const UserBaseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']).nullable(),
  avatarUrl: z.string().nullable(),
  status: z.enum(['active', 'suspended', 'banned', 'pending_verification']).nullable(),

});


export const UpdateUserOutputSchema = UserBaseSchema;


export type UpdateUserOutput = z.infer<typeof UpdateUserOutputSchema>;
