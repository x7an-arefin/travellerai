import { z } from 'zod';

const GuideProfileBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  photoUrl: z.string().nullable(),
  rating: z.string().nullable(),
  isAvailable: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).nullable(),

});


export const ListGuideProfileOutputSchema = z.object({
  items: z.array(GuideProfileBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListGuideProfileOutput = z.infer<typeof ListGuideProfileOutputSchema>;
