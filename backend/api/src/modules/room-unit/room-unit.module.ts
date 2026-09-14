import { Module } from 'honestjs';
import { RoomUnitController } from './room-unit.controller.js';
import { RoomUnitService } from './room-unit.service.js';
import { RoomUnitRepository } from './room-unit.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the RoomUnit controller, service, and repository with the DI container
 */
@Module({
  controllers: [RoomUnitController],
  services: [RoomUnitService, RoomUnitRepository],
})
export class RoomUnitModule {}
