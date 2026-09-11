import { z } from 'zod';

const AmenityBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  category: z.enum(['comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport']).nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const ListAmenityOutputSchema = z.object({
  items: z.array(AmenityBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListAmenityOutput = z.infer<typeof ListAmenityOutputSchema>;
