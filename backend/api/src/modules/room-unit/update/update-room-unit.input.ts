import { z } from 'zod';


export const UpdateRoomUnitInputSchema = z.object({
  roomTypeId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  roomNumber: z.string().max(20).optional(),
  floorNumber: z.number().int().optional(),
  wingOrBuilding: z.string().max(50).optional(),
  physicalStatus: z.enum(['clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order']).optional(),
  currentOccupancyStatus: z.enum(['vacant', 'occupied', 'reserved']).optional(),
  activeBookingId: z.string().uuid().optional(),
  cleanInspectedAt: z.string().datetime().optional(),
  lastCleanedBy: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateRoomUnitInput = z.infer<typeof UpdateRoomUnitInputSchema>;
