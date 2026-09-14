import { z } from 'zod';


export const GetHotelMaintenanceTicketInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelMaintenanceTicketInput = z.infer<typeof GetHotelMaintenanceTicketInputSchema>;
