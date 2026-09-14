import { Module } from 'honestjs';
import { RatePlanController } from './rate-plan.controller.js';
import { RatePlanService } from './rate-plan.service.js';
import { RatePlanRepository } from './rate-plan.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the RatePlan controller, service, and repository with the DI container
 */
@Module({
  controllers: [RatePlanController],
  services: [RatePlanService, RatePlanRepository],
})
export class RatePlanModule {}
