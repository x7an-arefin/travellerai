import { Module } from 'honestjs';
import { VehicleBookingController } from './vehicle-booking.controller.js';
import { VehicleBookingService } from './vehicle-booking.service.js';
import { VehicleBookingRepository } from './vehicle-booking.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleBooking controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleBookingController],
  services: [VehicleBookingService, VehicleBookingRepository],
})
export class VehicleBookingModule {}
