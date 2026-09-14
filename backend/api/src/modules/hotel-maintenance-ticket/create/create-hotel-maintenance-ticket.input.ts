import { z } from 'zod';


export const CreateHotelMaintenanceTicketInputSchema = z.object({
  propertyId: z.string().uuid(),
  roomUnitId: z.string().uuid().optional(),
  roomNumber: z.string().max(20).optional(),
  reportedBy: z.string().uuid().optional(),
  issueCategory: z.enum(['plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance']).optional().default('plumbing'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional().default('normal'),
  description: z.string(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled']).optional().default('open'),
  assignedTo: z.string().max(150).optional(),
  resolutionNotes: z.string().optional(),
  costAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  resolvedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelMaintenanceTicketInput = z.infer<typeof CreateHotelMaintenanceTicketInputSchema>;
