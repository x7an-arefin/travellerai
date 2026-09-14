import { z } from 'zod';

const HotelMaintenanceTicketBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  description: z.string(),
  reportedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelMaintenanceTicketOutputSchema = HotelMaintenanceTicketBaseSchema;


export type DeleteHotelMaintenanceTicketOutput = z.infer<typeof DeleteHotelMaintenanceTicketOutputSchema>;
