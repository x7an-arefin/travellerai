import { z } from 'zod';

const GuideProfileBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  name: z.string(),
  photoUrl: z.string().nullable(),
  bio: z.string().nullable(),
  languages: z.record(z.string(), z.unknown()).nullable(),
  certifications: z.record(z.string(), z.unknown()).nullable(),
  specialties: z.record(z.string(), z.unknown()).nullable(),
  rating: z.string().nullable(),
  isAvailable: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).nullable(),

});


export const GetGuideProfileOutputSchema = GuideProfileBaseSchema;


export type GetGuideProfileOutput = z.infer<typeof GetGuideProfileOutputSchema>;
