import { Module } from 'honestjs';
import { ProviderController } from './provider.controller.js';
import { ProviderService } from './provider.service.js';
import { ProviderRepository } from './provider.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Provider controller, service, and repository with the DI container
 */
@Module({
  controllers: [ProviderController],
  services: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
