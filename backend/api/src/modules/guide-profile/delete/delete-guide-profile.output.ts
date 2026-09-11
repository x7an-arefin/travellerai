import { z } from 'zod';

const GuideProfileBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteGuideProfileOutputSchema = GuideProfileBaseSchema;


export type DeleteGuideProfileOutput = z.infer<typeof DeleteGuideProfileOutputSchema>;
