import { z } from 'zod';

const HotelMaintenanceTicketBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  roomNumber: z.string().nullable(),
  issueCategory: z.enum(['plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance']).nullable(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).nullable(),
  status: z.enum(['open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled']).nullable(),
  assignedTo: z.string().nullable(),
  reportedAt: z.date(),

});


export const UpdateHotelMaintenanceTicketOutputSchema = HotelMaintenanceTicketBaseSchema;


export type UpdateHotelMaintenanceTicketOutput = z.infer<typeof UpdateHotelMaintenanceTicketOutputSchema>;
