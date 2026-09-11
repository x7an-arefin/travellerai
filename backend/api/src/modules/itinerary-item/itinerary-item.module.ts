import { Module } from 'honestjs';
import { ItineraryItemController } from './itinerary-item.controller.js';
import { ItineraryItemService } from './itinerary-item.service.js';
import { ItineraryItemRepository } from './itinerary-item.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ItineraryItem controller, service, and repository with the DI container
 */
@Module({
  controllers: [ItineraryItemController],
  services: [ItineraryItemService, ItineraryItemRepository],
})
export class ItineraryItemModule {}
