import { z } from 'zod';


export const DeleteHotelMaintenanceTicketInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelMaintenanceTicketInput = z.infer<typeof DeleteHotelMaintenanceTicketInputSchema>;
