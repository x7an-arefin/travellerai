export const VEHICLE_BOOKING_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-booking.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-booking.create.process.v1',
  CREATE_POST: 'traveller.vehicle-booking.create.post.v1',
  CREATED: 'traveller.vehicle-booking.created.v1',


  GET_PRE: 'traveller.vehicle-booking.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-booking.get.process.v1',
  GET_POST: 'traveller.vehicle-booking.get.post.v1',
  GETD: 'traveller.vehicle-booking.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-booking.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-booking.list.process.v1',
  LIST_POST: 'traveller.vehicle-booking.list.post.v1',
  LISTD: 'traveller.vehicle-booking.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-booking.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-booking.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-booking.update.post.v1',
  UPDATED: 'traveller.vehicle-booking.updated.v1',


  DELETE_PRE: 'traveller.vehicle-booking.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-booking.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-booking.delete.post.v1',
  DELETED: 'traveller.vehicle-booking.deleted.v1',

} as const;

export type VehicleBookingEventName = (typeof VEHICLE_BOOKING_EVENTS)[keyof typeof VEHICLE_BOOKING_EVENTS];
