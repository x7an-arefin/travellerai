import { Module } from 'honestjs';
import { VehicleReviewController } from './vehicle-review.controller.js';
import { VehicleReviewService } from './vehicle-review.service.js';
import { VehicleReviewRepository } from './vehicle-review.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleReview controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleReviewController],
  services: [VehicleReviewService, VehicleReviewRepository],
})
export class VehicleReviewModule {}
