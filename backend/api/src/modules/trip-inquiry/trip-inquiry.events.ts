export const TRIP_INQUIRY_EVENTS = {

  CREATE_PRE: 'traveller.trip-inquiry.create.pre.v1',
  CREATE_PROCESS: 'traveller.trip-inquiry.create.process.v1',
  CREATE_POST: 'traveller.trip-inquiry.create.post.v1',
  CREATED: 'traveller.trip-inquiry.created.v1',


  GET_PRE: 'traveller.trip-inquiry.get.pre.v1',
  GET_PROCESS: 'traveller.trip-inquiry.get.process.v1',
  GET_POST: 'traveller.trip-inquiry.get.post.v1',
  GETD: 'traveller.trip-inquiry.retrieved.v1',


  LIST_PRE: 'traveller.trip-inquiry.list.pre.v1',
  LIST_PROCESS: 'traveller.trip-inquiry.list.process.v1',
  LIST_POST: 'traveller.trip-inquiry.list.post.v1',
  LISTD: 'traveller.trip-inquiry.listed.v1',


  UPDATE_PRE: 'traveller.trip-inquiry.update.pre.v1',
  UPDATE_PROCESS: 'traveller.trip-inquiry.update.process.v1',
  UPDATE_POST: 'traveller.trip-inquiry.update.post.v1',
  UPDATED: 'traveller.trip-inquiry.updated.v1',


  DELETE_PRE: 'traveller.trip-inquiry.delete.pre.v1',
  DELETE_PROCESS: 'traveller.trip-inquiry.delete.process.v1',
  DELETE_POST: 'traveller.trip-inquiry.delete.post.v1',
  DELETED: 'traveller.trip-inquiry.deleted.v1',

} as const;

export type TripInquiryEventName = (typeof TRIP_INQUIRY_EVENTS)[keyof typeof TRIP_INQUIRY_EVENTS];
