import { Module } from 'honestjs';
import { VehicleProtectionPlanController } from './vehicle-protection-plan.controller.js';
import { VehicleProtectionPlanService } from './vehicle-protection-plan.service.js';
import { VehicleProtectionPlanRepository } from './vehicle-protection-plan.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleProtectionPlan controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleProtectionPlanController],
  services: [VehicleProtectionPlanService, VehicleProtectionPlanRepository],
})
export class VehicleProtectionPlanModule {}
