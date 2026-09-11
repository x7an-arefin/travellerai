import { z } from 'zod';

const ItineraryItemBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  dayNumber: z.number().int().nullable(),
  sequenceOrder: z.number().int(),
  title: z.string(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  locationName: z.string().nullable(),

});


export const ListItineraryItemOutputSchema = z.object({
  items: z.array(ItineraryItemBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListItineraryItemOutput = z.infer<typeof ListItineraryItemOutputSchema>;
