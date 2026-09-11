import { z } from 'zod';

const ItineraryItemBaseSchema = z.object({
  id: z.string(),
  dayNumber: z.number().int().nullable(),
  sequenceOrder: z.number().int(),
  title: z.string(),

});


export const UpdateItineraryItemOutputSchema = ItineraryItemBaseSchema;


export type UpdateItineraryItemOutput = z.infer<typeof UpdateItineraryItemOutputSchema>;
