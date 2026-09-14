import { z } from 'zod';

const RoomUnitBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  roomNumber: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteRoomUnitOutputSchema = RoomUnitBaseSchema;


export type DeleteRoomUnitOutput = z.infer<typeof DeleteRoomUnitOutputSchema>;
