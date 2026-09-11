import { Module } from 'honestjs';
import { GuideProfileController } from './guide-profile.controller.js';
import { GuideProfileService } from './guide-profile.service.js';
import { GuideProfileRepository } from './guide-profile.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the GuideProfile controller, service, and repository with the DI container
 */
@Module({
  controllers: [GuideProfileController],
  services: [GuideProfileService, GuideProfileRepository],
})
export class GuideProfileModule {}
