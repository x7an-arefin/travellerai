import { z } from 'zod';


export const CreateDestinationInputSchema = z.object({
  name: z.string().max(200),
  slug: z.string().max(250),
  country: z.string().max(100),
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
  isFeatured: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional().default('draft'),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateDestinationInput = z.infer<typeof CreateDestinationInputSchema>;
