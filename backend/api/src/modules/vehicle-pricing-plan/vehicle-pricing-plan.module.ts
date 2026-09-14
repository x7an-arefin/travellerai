import { Module } from 'honestjs';
import { VehiclePricingPlanController } from './vehicle-pricing-plan.controller.js';
import { VehiclePricingPlanService } from './vehicle-pricing-plan.service.js';
import { VehiclePricingPlanRepository } from './vehicle-pricing-plan.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehiclePricingPlan controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehiclePricingPlanController],
  services: [VehiclePricingPlanService, VehiclePricingPlanRepository],
})
export class VehiclePricingPlanModule {}
