import { z } from 'zod';


export const CreateRoomUnitInputSchema = z.object({
  roomTypeId: z.string().uuid(),
  propertyId: z.string().uuid(),
  roomNumber: z.string().max(20),
  floorNumber: z.number().int().optional().default(1),
  wingOrBuilding: z.string().max(50).optional(),
  physicalStatus: z.enum(['clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order']).optional().default('clean'),
  currentOccupancyStatus: z.enum(['vacant', 'occupied', 'reserved']).optional().default('vacant'),
  activeBookingId: z.string().uuid().optional(),
  cleanInspectedAt: z.string().datetime().optional(),
  lastCleanedBy: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateRoomUnitInput = z.infer<typeof CreateRoomUnitInputSchema>;
