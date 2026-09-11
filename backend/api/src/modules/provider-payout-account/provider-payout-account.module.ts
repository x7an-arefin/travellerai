import { Module } from 'honestjs';
import { ProviderPayoutAccountController } from './provider-payout-account.controller.js';
import { ProviderPayoutAccountService } from './provider-payout-account.service.js';
import { ProviderPayoutAccountRepository } from './provider-payout-account.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ProviderPayoutAccount controller, service, and repository with the DI container
 */
@Module({
  controllers: [ProviderPayoutAccountController],
  services: [ProviderPayoutAccountService, ProviderPayoutAccountRepository],
})
export class ProviderPayoutAccountModule {}
