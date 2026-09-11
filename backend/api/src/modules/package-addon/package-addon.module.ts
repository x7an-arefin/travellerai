import { Module } from 'honestjs';
import { PackageAddonController } from './package-addon.controller.js';
import { PackageAddonService } from './package-addon.service.js';
import { PackageAddonRepository } from './package-addon.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the PackageAddon controller, service, and repository with the DI container
 */
@Module({
  controllers: [PackageAddonController],
  services: [PackageAddonService, PackageAddonRepository],
})
export class PackageAddonModule {}
