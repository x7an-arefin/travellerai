import { Module } from 'honestjs';
import { RoomTypeController } from './room-type.controller.js';
import { RoomTypeService } from './room-type.service.js';
import { RoomTypeRepository } from './room-type.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the RoomType controller, service, and repository with the DI container
 */
@Module({
  controllers: [RoomTypeController],
  services: [RoomTypeService, RoomTypeRepository],
})
export class RoomTypeModule {}
