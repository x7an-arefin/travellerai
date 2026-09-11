import { z } from 'zod';

const DepartureBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  departureCode: z.string(),
  startDatetime: z.date(),
  capacity: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteDepartureOutputSchema = DepartureBaseSchema;


export type DeleteDepartureOutput = z.infer<typeof DeleteDepartureOutputSchema>;
