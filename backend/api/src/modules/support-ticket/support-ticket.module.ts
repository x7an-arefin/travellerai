import { Module } from 'honestjs';
import { SupportTicketController } from './support-ticket.controller.js';
import { SupportTicketService } from './support-ticket.service.js';
import { SupportTicketRepository } from './support-ticket.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the SupportTicket controller, service, and repository with the DI container
 */
@Module({
  controllers: [SupportTicketController],
  services: [SupportTicketService, SupportTicketRepository],
})
export class SupportTicketModule {}
