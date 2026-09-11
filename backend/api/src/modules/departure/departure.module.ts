import { Module } from 'honestjs';
import { DepartureController } from './departure.controller.js';
import { DepartureService } from './departure.service.js';
import { DepartureRepository } from './departure.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Departure controller, service, and repository with the DI container
 */
@Module({
  controllers: [DepartureController],
  services: [DepartureService, DepartureRepository],
})
export class DepartureModule {}
