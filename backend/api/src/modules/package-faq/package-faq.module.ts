import { Module } from 'honestjs';
import { PackageFaqController } from './package-faq.controller.js';
import { PackageFaqService } from './package-faq.service.js';
import { PackageFaqRepository } from './package-faq.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the PackageFaq controller, service, and repository with the DI container
 */
@Module({
  controllers: [PackageFaqController],
  services: [PackageFaqService, PackageFaqRepository],
})
export class PackageFaqModule {}
