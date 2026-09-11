import { z } from 'zod';


export const UpdateGuideProfileInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  name: z.string().max(200).optional(),
  photoUrl: z.string().max(500).optional(),
  bio: z.string().optional(),
  languages: z.record(z.string(), z.unknown()).optional(),
  certifications: z.record(z.string(), z.unknown()).optional(),
  specialties: z.record(z.string(), z.unknown()).optional(),
  rating: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  emergencyContact: z.record(z.string(), z.unknown()).optional(),
  isAvailable: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateGuideProfileInput = z.infer<typeof UpdateGuideProfileInputSchema>;
