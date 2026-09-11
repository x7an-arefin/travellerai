import { Module } from 'honestjs';
import { LoyaltyAccountController } from './loyalty-account.controller.js';
import { LoyaltyAccountService } from './loyalty-account.service.js';
import { LoyaltyAccountRepository } from './loyalty-account.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the LoyaltyAccount controller, service, and repository with the DI container
 */
@Module({
  controllers: [LoyaltyAccountController],
  services: [LoyaltyAccountService, LoyaltyAccountRepository],
})
export class LoyaltyAccountModule {}
