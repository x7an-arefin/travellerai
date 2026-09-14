export const HOTEL_BOOKING_EVENTS = {

  CREATE_PRE: 'traveller.hotel-booking.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-booking.create.process.v1',
  CREATE_POST: 'traveller.hotel-booking.create.post.v1',
  CREATED: 'traveller.hotel-booking.created.v1',


  GET_PRE: 'traveller.hotel-booking.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-booking.get.process.v1',
  GET_POST: 'traveller.hotel-booking.get.post.v1',
  GETD: 'traveller.hotel-booking.retrieved.v1',


  LIST_PRE: 'traveller.hotel-booking.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-booking.list.process.v1',
  LIST_POST: 'traveller.hotel-booking.list.post.v1',
  LISTD: 'traveller.hotel-booking.listed.v1',


  UPDATE_PRE: 'traveller.hotel-booking.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-booking.update.process.v1',
  UPDATE_POST: 'traveller.hotel-booking.update.post.v1',
  UPDATED: 'traveller.hotel-booking.updated.v1',


  DELETE_PRE: 'traveller.hotel-booking.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-booking.delete.process.v1',
  DELETE_POST: 'traveller.hotel-booking.delete.post.v1',
  DELETED: 'traveller.hotel-booking.deleted.v1',

} as const;

export type HotelBookingEventName = (typeof HOTEL_BOOKING_EVENTS)[keyof typeof HOTEL_BOOKING_EVENTS];
