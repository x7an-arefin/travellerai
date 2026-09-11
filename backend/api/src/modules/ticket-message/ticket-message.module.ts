import { Module } from 'honestjs';
import { TicketMessageController } from './ticket-message.controller.js';
import { TicketMessageService } from './ticket-message.service.js';
import { TicketMessageRepository } from './ticket-message.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the TicketMessage controller, service, and repository with the DI container
 */
@Module({
  controllers: [TicketMessageController],
  services: [TicketMessageService, TicketMessageRepository],
})
export class TicketMessageModule {}
