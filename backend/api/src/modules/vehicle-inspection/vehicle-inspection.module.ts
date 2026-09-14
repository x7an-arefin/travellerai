import { Module } from 'honestjs';
import { VehicleInspectionController } from './vehicle-inspection.controller.js';
import { VehicleInspectionService } from './vehicle-inspection.service.js';
import { VehicleInspectionRepository } from './vehicle-inspection.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleInspection controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleInspectionController],
  services: [VehicleInspectionService, VehicleInspectionRepository],
})
export class VehicleInspectionModule {}
