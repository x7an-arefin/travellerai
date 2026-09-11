import { z } from 'zod'

export const userStatusSchema = z.enum(['active', 'inactive', 'invited', 'suspended'])
export type UserStatus = z.infer<typeof userStatusSchema>

export const userRoleSchema = z.enum(['superadmin', 'admin', 'manager', 'cashier'])
export type UserRole = z.infer<typeof userRoleSchema>

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  avatar: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
