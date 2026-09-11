import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  status: z.enum(['backlog', 'todo', 'in progress', 'done', 'canceled']),
  label: z.enum(['bug', 'feature', 'documentation']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>
