import { Module } from 'honestjs';
import { PackageController } from './package.controller.js';
import { PackageService } from './package.service.js';
import { PackageRepository } from './package.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Package controller, service, and repository with the DI container
 */
@Module({
  controllers: [PackageController],
  services: [PackageService, PackageRepository],
})
export class PackageModule {}
