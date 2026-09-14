import { Module } from 'honestjs';
import { DriverController } from './driver.controller.js';
import { DriverService } from './driver.service.js';
import { DriverRepository } from './driver.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Driver controller, service, and repository with the DI container
 */
@Module({
  controllers: [DriverController],
  services: [DriverService, DriverRepository],
})
export class DriverModule {}
