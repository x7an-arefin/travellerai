import { Module } from 'honestjs';
import { ProviderWalletController } from './provider-wallet.controller.js';
import { ProviderWalletService } from './provider-wallet.service.js';
import { ProviderWalletRepository } from './provider-wallet.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ProviderWallet controller, service, and repository with the DI container
 */
@Module({
  controllers: [ProviderWalletController],
  services: [ProviderWalletService, ProviderWalletRepository],
})
export class ProviderWalletModule {}
