import { Module } from 'honestjs';
import { CustomerWalletController } from './customer-wallet.controller.js';
import { CustomerWalletService } from './customer-wallet.service.js';
import { CustomerWalletRepository } from './customer-wallet.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the CustomerWallet controller, service, and repository with the DI container
 */
@Module({
  controllers: [CustomerWalletController],
  services: [CustomerWalletService, CustomerWalletRepository],
})
export class CustomerWalletModule {}
