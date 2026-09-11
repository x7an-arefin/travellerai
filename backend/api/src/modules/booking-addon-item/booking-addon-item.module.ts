import { Module } from 'honestjs';
import { BookingAddonItemController } from './booking-addon-item.controller.js';
import { BookingAddonItemService } from './booking-addon-item.service.js';
import { BookingAddonItemRepository } from './booking-addon-item.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the BookingAddonItem controller, service, and repository with the DI container
 */
@Module({
  controllers: [BookingAddonItemController],
  services: [BookingAddonItemService, BookingAddonItemRepository],
})
export class BookingAddonItemModule {}
