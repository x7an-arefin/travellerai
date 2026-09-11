import { Module } from 'honestjs';
import { DestinationController } from './destination.controller.js';
import { DestinationService } from './destination.service.js';
import { DestinationRepository } from './destination.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Destination controller, service, and repository with the DI container
 */
@Module({
  controllers: [DestinationController],
  services: [DestinationService, DestinationRepository],
})
export class DestinationModule {}
