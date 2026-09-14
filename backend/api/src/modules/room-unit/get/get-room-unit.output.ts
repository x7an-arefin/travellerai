import { z } from 'zod';

const RoomUnitBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  roomNumber: z.string(),
  floorNumber: z.number().int().nullable(),
  physicalStatus: z.enum(['clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order']).nullable(),
  currentOccupancyStatus: z.enum(['vacant', 'occupied', 'reserved']).nullable(),

});


export const GetRoomUnitOutputSchema = RoomUnitBaseSchema;


export type GetRoomUnitOutput = z.infer<typeof GetRoomUnitOutputSchema>;
