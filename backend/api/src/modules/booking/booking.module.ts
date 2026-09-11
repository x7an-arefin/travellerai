import { Module } from 'honestjs';
import { BookingController } from './booking.controller.js';
import { BookingService } from './booking.service.js';
import { BookingRepository } from './booking.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Booking controller, service, and repository with the DI container
 */
@Module({
  controllers: [BookingController],
  services: [BookingService, BookingRepository],
})
export class BookingModule {}
