import { Module } from 'honestjs';
import { VehicleBookingExtraController } from './vehicle-booking-extra.controller.js';
import { VehicleBookingExtraService } from './vehicle-booking-extra.service.js';
import { VehicleBookingExtraRepository } from './vehicle-booking-extra.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleBookingExtra controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleBookingExtraController],
  services: [VehicleBookingExtraService, VehicleBookingExtraRepository],
})
export class VehicleBookingExtraModule {}
