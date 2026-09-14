export const HOTEL_REVIEW_EVENTS = {

  CREATE_PRE: 'traveller.hotel-review.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-review.create.process.v1',
  CREATE_POST: 'traveller.hotel-review.create.post.v1',
  CREATED: 'traveller.hotel-review.created.v1',


  GET_PRE: 'traveller.hotel-review.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-review.get.process.v1',
  GET_POST: 'traveller.hotel-review.get.post.v1',
  GETD: 'traveller.hotel-review.retrieved.v1',


  LIST_PRE: 'traveller.hotel-review.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-review.list.process.v1',
  LIST_POST: 'traveller.hotel-review.list.post.v1',
  LISTD: 'traveller.hotel-review.listed.v1',


  UPDATE_PRE: 'traveller.hotel-review.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-review.update.process.v1',
  UPDATE_POST: 'traveller.hotel-review.update.post.v1',
  UPDATED: 'traveller.hotel-review.updated.v1',


  DELETE_PRE: 'traveller.hotel-review.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-review.delete.process.v1',
  DELETE_POST: 'traveller.hotel-review.delete.post.v1',
  DELETED: 'traveller.hotel-review.deleted.v1',

} as const;

export type HotelReviewEventName = (typeof HOTEL_REVIEW_EVENTS)[keyof typeof HOTEL_REVIEW_EVENTS];
