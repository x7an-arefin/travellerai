import { Module } from 'honestjs';
import { BookingParticipantController } from './booking-participant.controller.js';
import { BookingParticipantService } from './booking-participant.service.js';
import { BookingParticipantRepository } from './booking-participant.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the BookingParticipant controller, service, and repository with the DI container
 */
@Module({
  controllers: [BookingParticipantController],
  services: [BookingParticipantService, BookingParticipantRepository],
})
export class BookingParticipantModule {}
