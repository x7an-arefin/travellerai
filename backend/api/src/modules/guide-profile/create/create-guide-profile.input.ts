import { z } from 'zod';


export const CreateGuideProfileInputSchema = z.object({
  providerId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  name: z.string().max(200),
  photoUrl: z.string().max(500).optional(),
  bio: z.string().optional(),
  languages: z.record(z.string(), z.unknown()).optional(),
  certifications: z.record(z.string(), z.unknown()).optional(),
  specialties: z.record(z.string(), z.unknown()).optional(),
  rating: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  emergencyContact: z.record(z.string(), z.unknown()).optional(),
  isAvailable: z.boolean().optional().default(true),
  status: z.enum(['active', 'inactive', 'suspended']).optional().default('active'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateGuideProfileInput = z.infer<typeof CreateGuideProfileInputSchema>;
