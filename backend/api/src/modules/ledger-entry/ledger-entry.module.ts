import { Module } from 'honestjs';
import { LedgerEntryController } from './ledger-entry.controller.js';
import { LedgerEntryService } from './ledger-entry.service.js';
import { LedgerEntryRepository } from './ledger-entry.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the LedgerEntry controller, service, and repository with the DI container
 */
@Module({
  controllers: [LedgerEntryController],
  services: [LedgerEntryService, LedgerEntryRepository],
})
export class LedgerEntryModule {}
