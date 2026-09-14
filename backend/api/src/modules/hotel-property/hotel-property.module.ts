import { Module } from 'honestjs';
import { HotelPropertyController } from './hotel-property.controller.js';
import { HotelPropertyService } from './hotel-property.service.js';
import { HotelPropertyRepository } from './hotel-property.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelProperty controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelPropertyController],
  services: [HotelPropertyService, HotelPropertyRepository],
})
export class HotelPropertyModule {}
