import { Module } from 'honestjs';
import { DisputeController } from './dispute.controller.js';
import { DisputeService } from './dispute.service.js';
import { DisputeRepository } from './dispute.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Dispute controller, service, and repository with the DI container
 */
@Module({
  controllers: [DisputeController],
  services: [DisputeService, DisputeRepository],
})
export class DisputeModule {}
