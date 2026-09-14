import { Module } from 'honestjs';
import { VehicleComplianceDocController } from './vehicle-compliance-doc.controller.js';
import { VehicleComplianceDocService } from './vehicle-compliance-doc.service.js';
import { VehicleComplianceDocRepository } from './vehicle-compliance-doc.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleComplianceDoc controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleComplianceDocController],
  services: [VehicleComplianceDocService, VehicleComplianceDocRepository],
})
export class VehicleComplianceDocModule {}
