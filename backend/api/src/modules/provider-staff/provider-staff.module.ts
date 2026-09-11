import { Module } from 'honestjs';
import { ProviderStaffController } from './provider-staff.controller.js';
import { ProviderStaffService } from './provider-staff.service.js';
import { ProviderStaffRepository } from './provider-staff.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ProviderStaff controller, service, and repository with the DI container
 */
@Module({
  controllers: [ProviderStaffController],
  services: [ProviderStaffService, ProviderStaffRepository],
})
export class ProviderStaffModule {}
