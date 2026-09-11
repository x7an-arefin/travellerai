import { z } from 'zod';

const UserBaseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']).nullable(),
  status: z.enum(['active', 'suspended', 'banned', 'pending_verification']).nullable(),

});


export const ListUserOutputSchema = z.object({
  items: z.array(UserBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListUserOutput = z.infer<typeof ListUserOutputSchema>;
