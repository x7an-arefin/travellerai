import { z } from 'zod';

const ItineraryItemBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  dayNumber: z.number().int().nullable(),
  sequenceOrder: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  locationName: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  meals: z.record(z.string(), z.unknown()).nullable(),
  accommodation: z.record(z.string(), z.unknown()).nullable(),
  transport: z.record(z.string(), z.unknown()).nullable(),
  includedItems: z.record(z.string(), z.unknown()).nullable(),
  optionalItems: z.record(z.string(), z.unknown()).nullable(),

});


export const GetItineraryItemOutputSchema = ItineraryItemBaseSchema;


export type GetItineraryItemOutput = z.infer<typeof GetItineraryItemOutputSchema>;
