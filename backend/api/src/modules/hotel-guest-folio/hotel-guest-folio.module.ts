import { Module } from 'honestjs';
import { HotelGuestFolioController } from './hotel-guest-folio.controller.js';
import { HotelGuestFolioService } from './hotel-guest-folio.service.js';
import { HotelGuestFolioRepository } from './hotel-guest-folio.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelGuestFolio controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelGuestFolioController],
  services: [HotelGuestFolioService, HotelGuestFolioRepository],
})
export class HotelGuestFolioModule {}
