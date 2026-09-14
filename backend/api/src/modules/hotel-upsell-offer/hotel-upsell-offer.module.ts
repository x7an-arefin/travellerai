import { Module } from 'honestjs';
import { HotelUpsellOfferController } from './hotel-upsell-offer.controller.js';
import { HotelUpsellOfferService } from './hotel-upsell-offer.service.js';
import { HotelUpsellOfferRepository } from './hotel-upsell-offer.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelUpsellOffer controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelUpsellOfferController],
  services: [HotelUpsellOfferService, HotelUpsellOfferRepository],
})
export class HotelUpsellOfferModule {}
