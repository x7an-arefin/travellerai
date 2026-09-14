export const VEHICLE_BOOKING_EXTRA_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-booking-extra.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-booking-extra.create.process.v1',
  CREATE_POST: 'traveller.vehicle-booking-extra.create.post.v1',
  CREATED: 'traveller.vehicle-booking-extra.created.v1',


  GET_PRE: 'traveller.vehicle-booking-extra.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-booking-extra.get.process.v1',
  GET_POST: 'traveller.vehicle-booking-extra.get.post.v1',
  GETD: 'traveller.vehicle-booking-extra.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-booking-extra.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-booking-extra.list.process.v1',
  LIST_POST: 'traveller.vehicle-booking-extra.list.post.v1',
  LISTD: 'traveller.vehicle-booking-extra.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-booking-extra.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-booking-extra.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-booking-extra.update.post.v1',
  UPDATED: 'traveller.vehicle-booking-extra.updated.v1',


  DELETE_PRE: 'traveller.vehicle-booking-extra.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-booking-extra.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-booking-extra.delete.post.v1',
  DELETED: 'traveller.vehicle-booking-extra.deleted.v1',

} as const;

export type VehicleBookingExtraEventName = (typeof VEHICLE_BOOKING_EXTRA_EVENTS)[keyof typeof VEHICLE_BOOKING_EXTRA_EVENTS];
