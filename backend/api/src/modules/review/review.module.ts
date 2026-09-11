import { Module } from 'honestjs';
import { ReviewController } from './review.controller.js';
import { ReviewService } from './review.service.js';
import { ReviewRepository } from './review.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Review controller, service, and repository with the DI container
 */
@Module({
  controllers: [ReviewController],
  services: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
