import { Module } from 'honestjs';
import { HotelUpsellConversionController } from './hotel-upsell-conversion.controller.js';
import { HotelUpsellConversionService } from './hotel-upsell-conversion.service.js';
import { HotelUpsellConversionRepository } from './hotel-upsell-conversion.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelUpsellConversion controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelUpsellConversionController],
  services: [HotelUpsellConversionService, HotelUpsellConversionRepository],
})
export class HotelUpsellConversionModule {}
