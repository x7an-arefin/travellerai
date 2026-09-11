import { Module } from 'honestjs';
import { GiftCardController } from './gift-card.controller.js';
import { GiftCardService } from './gift-card.service.js';
import { GiftCardRepository } from './gift-card.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the GiftCard controller, service, and repository with the DI container
 */
@Module({
  controllers: [GiftCardController],
  services: [GiftCardService, GiftCardRepository],
})
export class GiftCardModule {}
