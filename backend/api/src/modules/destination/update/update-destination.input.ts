import { z } from 'zod';


export const UpdateDestinationInputSchema = z.object({
  name: z.string().max(200).optional(),
  slug: z.string().max(250).optional(),
  country: z.string().max(100).optional(),
  countryCode: z.string().max(5).optional(),
  stateRegion: z.string().max(150).optional(),
  description: z.string().optional(),
  travelGuide: z.string().optional(),
  coverImage: z.string().max(500).optional(),
  gallery: z.record(z.string(), z.unknown()).optional(),
  latitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  longitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  weatherInfo: z.record(z.string(), z.unknown()).optional(),
  visaInfo: z.string().optional(),
  safetyInfo: z.string().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateDestinationInput = z.infer<typeof UpdateDestinationInputSchema>;
