import { z } from 'zod';

const DepartureBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  departureCode: z.string(),
  startDatetime: z.date(),
  capacity: z.number().int(),
  status: z.enum(['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']).nullable(),

});


export const CreateDepartureOutputSchema = DepartureBaseSchema;


export type CreateDepartureOutput = z.infer<typeof CreateDepartureOutputSchema>;
