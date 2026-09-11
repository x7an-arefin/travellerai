import { z } from 'zod';

const ItineraryItemBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  sequenceOrder: z.number().int(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteItineraryItemOutputSchema = ItineraryItemBaseSchema;


export type DeleteItineraryItemOutput = z.infer<typeof DeleteItineraryItemOutputSchema>;
