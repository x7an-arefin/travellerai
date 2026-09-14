import { Module } from 'honestjs';
import { PropertyAmenityController } from './property-amenity.controller.js';
import { PropertyAmenityService } from './property-amenity.service.js';
import { PropertyAmenityRepository } from './property-amenity.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the PropertyAmenity controller, service, and repository with the DI container
 */
@Module({
  controllers: [PropertyAmenityController],
  services: [PropertyAmenityService, PropertyAmenityRepository],
})
export class PropertyAmenityModule {}
