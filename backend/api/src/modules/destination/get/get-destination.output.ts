import { z } from 'zod';

const DestinationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  countryCode: z.string().nullable(),
  stateRegion: z.string().nullable(),
  description: z.string().nullable(),
  travelGuide: z.string().nullable(),
  coverImage: z.string().nullable(),
  gallery: z.record(z.string(), z.unknown()).nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  isFeatured: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'draft']).nullable(),

});


export const GetDestinationOutputSchema = DestinationBaseSchema;


export type GetDestinationOutput = z.infer<typeof GetDestinationOutputSchema>;
