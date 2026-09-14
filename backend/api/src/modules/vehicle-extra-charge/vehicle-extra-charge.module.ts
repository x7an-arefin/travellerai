import { Module } from 'honestjs';
import { VehicleExtraChargeController } from './vehicle-extra-charge.controller.js';
import { VehicleExtraChargeService } from './vehicle-extra-charge.service.js';
import { VehicleExtraChargeRepository } from './vehicle-extra-charge.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleExtraCharge controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleExtraChargeController],
  services: [VehicleExtraChargeService, VehicleExtraChargeRepository],
})
export class VehicleExtraChargeModule {}
