import { Module } from 'honestjs';
import { AmenityController } from './amenity.controller.js';
import { AmenityService } from './amenity.service.js';
import { AmenityRepository } from './amenity.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Amenity controller, service, and repository with the DI container
 */
@Module({
  controllers: [AmenityController],
  services: [AmenityService, AmenityRepository],
})
export class AmenityModule {}
