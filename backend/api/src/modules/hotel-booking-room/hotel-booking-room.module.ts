import { Module } from 'honestjs';
import { HotelBookingRoomController } from './hotel-booking-room.controller.js';
import { HotelBookingRoomService } from './hotel-booking-room.service.js';
import { HotelBookingRoomRepository } from './hotel-booking-room.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the HotelBookingRoom controller, service, and repository with the DI container
 */
@Module({
  controllers: [HotelBookingRoomController],
  services: [HotelBookingRoomService, HotelBookingRoomRepository],
})
export class HotelBookingRoomModule {}
