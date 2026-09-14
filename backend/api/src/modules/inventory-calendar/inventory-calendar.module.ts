import { Module } from 'honestjs';
import { InventoryCalendarController } from './inventory-calendar.controller.js';
import { InventoryCalendarService } from './inventory-calendar.service.js';
import { InventoryCalendarRepository } from './inventory-calendar.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the InventoryCalendar controller, service, and repository with the DI container
 */
@Module({
  controllers: [InventoryCalendarController],
  services: [InventoryCalendarService, InventoryCalendarRepository],
})
export class InventoryCalendarModule {}
