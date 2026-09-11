export const BOOKING_EVENTS = {

  CREATE_PRE: 'traveller.booking.create.pre.v1',
  CREATE_PROCESS: 'traveller.booking.create.process.v1',
  CREATE_POST: 'traveller.booking.create.post.v1',
  CREATED: 'traveller.booking.created.v1',


  GET_PRE: 'traveller.booking.get.pre.v1',
  GET_PROCESS: 'traveller.booking.get.process.v1',
  GET_POST: 'traveller.booking.get.post.v1',
  GETD: 'traveller.booking.retrieved.v1',


  LIST_PRE: 'traveller.booking.list.pre.v1',
  LIST_PROCESS: 'traveller.booking.list.process.v1',
  LIST_POST: 'traveller.booking.list.post.v1',
  LISTD: 'traveller.booking.listed.v1',


  UPDATE_PRE: 'traveller.booking.update.pre.v1',
  UPDATE_PROCESS: 'traveller.booking.update.process.v1',
  UPDATE_POST: 'traveller.booking.update.post.v1',
  UPDATED: 'traveller.booking.updated.v1',


  DELETE_PRE: 'traveller.booking.delete.pre.v1',
  DELETE_PROCESS: 'traveller.booking.delete.process.v1',
  DELETE_POST: 'traveller.booking.delete.post.v1',
  DELETED: 'traveller.booking.deleted.v1',

} as const;

export type BookingEventName = (typeof BOOKING_EVENTS)[keyof typeof BOOKING_EVENTS];
