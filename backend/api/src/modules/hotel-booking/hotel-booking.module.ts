import { Module } from 'honestjs';
import { HotelBookingController } from './hotel-booking.controller.js';
import { HotelBookingService } from './hotel-booking.service.js';
import { HotelBookingRepository } from './hotel-booking.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelBooking controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelBookingController],
  services: [HotelBookingService, HotelBookingRepository],
})
export class HotelBookingModule {}
