import { z } from 'zod';

const DepartureBaseSchema = z.object({
  id: z.string(),
  departureCode: z.string(),
  capacity: z.number().int(),
  status: z.enum(['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']).nullable(),

});


export const UpdateDepartureOutputSchema = DepartureBaseSchema;


export type UpdateDepartureOutput = z.infer<typeof UpdateDepartureOutputSchema>;
