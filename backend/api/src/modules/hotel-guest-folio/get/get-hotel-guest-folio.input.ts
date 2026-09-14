import { z } from 'zod';


export const GetHotelGuestFolioInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelGuestFolioInput = z.infer<typeof GetHotelGuestFolioInputSchema>;
