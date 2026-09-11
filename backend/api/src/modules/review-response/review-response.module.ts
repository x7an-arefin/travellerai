import { Module } from 'honestjs';
import { ReviewResponseController } from './review-response.controller.js';
import { ReviewResponseService } from './review-response.service.js';
import { ReviewResponseRepository } from './review-response.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ReviewResponse controller, service, and repository with the DI container
 */
@Module({
  controllers: [ReviewResponseController],
  services: [ReviewResponseService, ReviewResponseRepository],
})
export class ReviewResponseModule {}
