import { z } from 'zod';


export const DeleteHotelGuestFolioInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelGuestFolioInput = z.infer<typeof DeleteHotelGuestFolioInputSchema>;
