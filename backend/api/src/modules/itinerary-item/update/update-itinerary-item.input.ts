import { z } from 'zod';


export const UpdateItineraryItemInputSchema = z.object({
  packageId: z.string().uuid().optional(),
  dayNumber: z.number().int().optional(),
  sequenceOrder: z.number().int().optional(),
  title: z.string().max(300).optional(),
  description: z.string().optional(),
  startTime: z.string().max(10).optional(),
  endTime: z.string().max(10).optional(),
  locationName: z.string().max(300).optional(),
  latitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  longitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  meals: z.record(z.string(), z.unknown()).optional(),
  accommodation: z.record(z.string(), z.unknown()).optional(),
  transport: z.record(z.string(), z.unknown()).optional(),
  includedItems: z.record(z.string(), z.unknown()).optional(),
  optionalItems: z.record(z.string(), z.unknown()).optional(),
  mediaUrls: z.record(z.string(), z.unknown()).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateItineraryItemInput = z.infer<typeof UpdateItineraryItemInputSchema>;
