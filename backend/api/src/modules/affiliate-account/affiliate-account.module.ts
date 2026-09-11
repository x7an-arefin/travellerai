import { Module } from 'honestjs';
import { AffiliateAccountController } from './affiliate-account.controller.js';
import { AffiliateAccountService } from './affiliate-account.service.js';
import { AffiliateAccountRepository } from './affiliate-account.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the AffiliateAccount controller, service, and repository with the DI container
 */
@Module({
  controllers: [AffiliateAccountController],
  services: [AffiliateAccountService, AffiliateAccountRepository],
})
export class AffiliateAccountModule {}
