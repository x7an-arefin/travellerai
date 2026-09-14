import { Module } from 'honestjs';
import { HotelReviewController } from './hotel-review.controller.js';
import { HotelReviewService } from './hotel-review.service.js';
import { HotelReviewRepository } from './hotel-review.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelReview controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelReviewController],
  services: [HotelReviewService, HotelReviewRepository],
})
export class HotelReviewModule {}
