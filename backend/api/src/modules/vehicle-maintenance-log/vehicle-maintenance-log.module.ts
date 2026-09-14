import { Module } from 'honestjs';
import { VehicleMaintenanceLogController } from './vehicle-maintenance-log.controller.js';
import { VehicleMaintenanceLogService } from './vehicle-maintenance-log.service.js';
import { VehicleMaintenanceLogRepository } from './vehicle-maintenance-log.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleMaintenanceLog controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleMaintenanceLogController],
  services: [VehicleMaintenanceLogService, VehicleMaintenanceLogRepository],
})
export class VehicleMaintenanceLogModule {}
