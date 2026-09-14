export const HOTEL_BOOKING_ROOM_EVENTS = {

  CREATE_PRE: 'traveller.hotel-booking-room.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-booking-room.create.process.v1',
  CREATE_POST: 'traveller.hotel-booking-room.create.post.v1',
  CREATED: 'traveller.hotel-booking-room.created.v1',


  GET_PRE: 'traveller.hotel-booking-room.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-booking-room.get.process.v1',
  GET_POST: 'traveller.hotel-booking-room.get.post.v1',
  GETD: 'traveller.hotel-booking-room.retrieved.v1',


  LIST_PRE: 'traveller.hotel-booking-room.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-booking-room.list.process.v1',
  LIST_POST: 'traveller.hotel-booking-room.list.post.v1',
  LISTD: 'traveller.hotel-booking-room.listed.v1',


  UPDATE_PRE: 'traveller.hotel-booking-room.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-booking-room.update.process.v1',
  UPDATE_POST: 'traveller.hotel-booking-room.update.post.v1',
  UPDATED: 'traveller.hotel-booking-room.updated.v1',


  DELETE_PRE: 'traveller.hotel-booking-room.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-booking-room.delete.process.v1',
  DELETE_POST: 'traveller.hotel-booking-room.delete.post.v1',
  DELETED: 'traveller.hotel-booking-room.deleted.v1',

} as const;

export type HotelBookingRoomEventName = (typeof HOTEL_BOOKING_ROOM_EVENTS)[keyof typeof HOTEL_BOOKING_ROOM_EVENTS];
