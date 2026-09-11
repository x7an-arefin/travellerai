import { z } from 'zod';


export const UpdateBookingParticipantInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  fullName: z.string().max(200).optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.string().max(20).optional(),
  nationality: z.string().max(100).optional(),
  passportNumber: z.string().max(50).optional(),
  passportExpiry: z.string().datetime().optional(),
  emergencyContact: z.record(z.string(), z.unknown()).optional(),
  dietaryRequirements: z.string().max(500).optional(),
  accessibilityRequirements: z.string().max(500).optional(),
  voluntaryMedicalNotes: z.string().optional(),
  isPrimaryContact: z.boolean().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateBookingParticipantInput = z.infer<typeof UpdateBookingParticipantInputSchema>;
