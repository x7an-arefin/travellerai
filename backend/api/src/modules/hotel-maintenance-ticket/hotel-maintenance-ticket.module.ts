import { Module } from 'honestjs';
import { HotelMaintenanceTicketController } from './hotel-maintenance-ticket.controller.js';
import { HotelMaintenanceTicketService } from './hotel-maintenance-ticket.service.js';
import { HotelMaintenanceTicketRepository } from './hotel-maintenance-ticket.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelMaintenanceTicket controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelMaintenanceTicketController],
  services: [HotelMaintenanceTicketService, HotelMaintenanceTicketRepository],
})
export class HotelMaintenanceTicketModule {}
