import { z } from 'zod';


export const UpdateHotelMaintenanceTicketInputSchema = z.object({
  propertyId: z.string().uuid().optional(),
  roomUnitId: z.string().uuid().optional(),
  roomNumber: z.string().max(20).optional(),
  reportedBy: z.string().uuid().optional(),
  issueCategory: z.enum(['plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance']).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  description: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled']).optional(),
  assignedTo: z.string().max(150).optional(),
  resolutionNotes: z.string().optional(),
  costAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  resolvedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelMaintenanceTicketInput = z.infer<typeof UpdateHotelMaintenanceTicketInputSchema>;
