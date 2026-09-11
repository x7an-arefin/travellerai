import { z } from 'zod';

const PackageBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired']).nullable(),

});


export const UpdatePackageOutputSchema = PackageBaseSchema;


export type UpdatePackageOutput = z.infer<typeof UpdatePackageOutputSchema>;
