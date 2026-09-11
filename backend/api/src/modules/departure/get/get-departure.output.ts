import { z } from 'zod';

const DepartureBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  departureCode: z.string(),
  startDatetime: z.date(),
  endDatetime: z.date().nullable(),
  capacity: z.number().int(),
  bookedCount: z.number().int().nullable(),
  availableCount: z.number().int().nullable(),
  priceOverride: z.string().nullable(),
  bookingCutoffHours: z.number().int().nullable(),
  meetingPoint: z.string().nullable(),
  status: z.enum(['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']).nullable(),

});


export const GetDepartureOutputSchema = DepartureBaseSchema;


export type GetDepartureOutput = z.infer<typeof GetDepartureOutputSchema>;
