import { Module } from 'honestjs';
import { WaitlistController } from './waitlist.controller.js';
import { WaitlistService } from './waitlist.service.js';
import { WaitlistRepository } from './waitlist.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Waitlist controller, service, and repository with the DI container
 */
@Module({
  controllers: [WaitlistController],
  services: [WaitlistService, WaitlistRepository],
})
export class WaitlistModule {}
