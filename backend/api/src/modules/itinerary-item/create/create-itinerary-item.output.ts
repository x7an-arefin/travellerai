import { z } from 'zod';

const ItineraryItemBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  dayNumber: z.number().int().nullable(),
  sequenceOrder: z.number().int(),
  title: z.string(),

});


export const CreateItineraryItemOutputSchema = ItineraryItemBaseSchema;


export type CreateItineraryItemOutput = z.infer<typeof CreateItineraryItemOutputSchema>;
