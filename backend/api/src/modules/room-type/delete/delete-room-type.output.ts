import { z } from 'zod';

const RoomTypeBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  name: z.string(),
  slug: z.string(),
  maxOccupancyAdults: z.number().int(),
  maxTotalGuests: z.number().int(),
  basePricePerNight: z.string(),
  totalUnitsCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteRoomTypeOutputSchema = RoomTypeBaseSchema;


export type DeleteRoomTypeOutput = z.infer<typeof DeleteRoomTypeOutputSchema>;
