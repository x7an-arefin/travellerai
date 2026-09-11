import { z } from 'zod';

const DestinationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  coverImage: z.string().nullable(),
  isFeatured: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'draft']).nullable(),

});


export const ListDestinationOutputSchema = z.object({
  items: z.array(DestinationBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListDestinationOutput = z.infer<typeof ListDestinationOutputSchema>;
