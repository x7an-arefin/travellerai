import { Module } from 'honestjs';
import { KycDocumentController } from './kyc-document.controller.js';
import { KycDocumentService } from './kyc-document.service.js';
import { KycDocumentRepository } from './kyc-document.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the KycDocument controller, service, and repository with the DI container
 */
@Module({
  controllers: [KycDocumentController],
  services: [KycDocumentService, KycDocumentRepository],
})
export class KycDocumentModule {}
