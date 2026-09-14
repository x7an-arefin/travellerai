export const VEHICLE_REVIEW_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-review.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-review.create.process.v1',
  CREATE_POST: 'traveller.vehicle-review.create.post.v1',
  CREATED: 'traveller.vehicle-review.created.v1',


  GET_PRE: 'traveller.vehicle-review.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-review.get.process.v1',
  GET_POST: 'traveller.vehicle-review.get.post.v1',
  GETD: 'traveller.vehicle-review.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-review.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-review.list.process.v1',
  LIST_POST: 'traveller.vehicle-review.list.post.v1',
  LISTD: 'traveller.vehicle-review.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-review.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-review.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-review.update.post.v1',
  UPDATED: 'traveller.vehicle-review.updated.v1',


  DELETE_PRE: 'traveller.vehicle-review.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-review.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-review.delete.post.v1',
  DELETED: 'traveller.vehicle-review.deleted.v1',

} as const;

export type VehicleReviewEventName = (typeof VEHICLE_REVIEW_EVENTS)[keyof typeof VEHICLE_REVIEW_EVENTS];
