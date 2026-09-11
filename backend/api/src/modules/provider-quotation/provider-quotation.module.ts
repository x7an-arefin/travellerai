import { Module } from 'honestjs';
import { ProviderQuotationController } from './provider-quotation.controller.js';
import { ProviderQuotationService } from './provider-quotation.service.js';
import { ProviderQuotationRepository } from './provider-quotation.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ProviderQuotation controller, service, and repository with the DI container
 */
@Module({
  controllers: [ProviderQuotationController],
  services: [ProviderQuotationService, ProviderQuotationRepository],
})
export class ProviderQuotationModule {}
