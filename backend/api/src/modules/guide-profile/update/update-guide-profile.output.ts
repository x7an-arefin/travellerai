import { z } from 'zod';

const GuideProfileBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  isAvailable: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).nullable(),

});


export const UpdateGuideProfileOutputSchema = GuideProfileBaseSchema;


export type UpdateGuideProfileOutput = z.infer<typeof UpdateGuideProfileOutputSchema>;
