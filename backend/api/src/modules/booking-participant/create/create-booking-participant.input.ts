import { z } from 'zod';


export const CreateBookingParticipantInputSchema = z.object({
  bookingId: z.string().uuid(),
  fullName: z.string().max(200),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.string().max(20).optional(),
  nationality: z.string().max(100).optional(),
  passportNumber: z.string().max(50).optional(),
  passportExpiry: z.string().datetime().optional(),
  emergencyContact: z.record(z.string(), z.unknown()).optional(),
  dietaryRequirements: z.string().max(500).optional(),
  accessibilityRequirements: z.string().max(500).optional(),
  voluntaryMedicalNotes: z.string().optional(),
  isPrimaryContact: z.boolean().optional().default(false),

});



export type CreateBookingParticipantInput = z.infer<typeof CreateBookingParticipantInputSchema>;
