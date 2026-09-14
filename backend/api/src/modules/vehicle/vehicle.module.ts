import { Module } from 'honestjs';
import { VehicleController } from './vehicle.controller.js';
import { VehicleService } from './vehicle.service.js';
import { VehicleRepository } from './vehicle.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Vehicle controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleController],
  services: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
