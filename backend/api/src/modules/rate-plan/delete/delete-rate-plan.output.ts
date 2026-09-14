import { z } from 'zod';

const RatePlanBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  planCode: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteRatePlanOutputSchema = RatePlanBaseSchema;


export type DeleteRatePlanOutput = z.infer<typeof DeleteRatePlanOutputSchema>;
