export const REVIEW_EVENTS = {

  CREATE_PRE: 'traveller.review.create.pre.v1',
  CREATE_PROCESS: 'traveller.review.create.process.v1',
  CREATE_POST: 'traveller.review.create.post.v1',
  CREATED: 'traveller.review.created.v1',


  GET_PRE: 'traveller.review.get.pre.v1',
  GET_PROCESS: 'traveller.review.get.process.v1',
  GET_POST: 'traveller.review.get.post.v1',
  GETD: 'traveller.review.retrieved.v1',


  LIST_PRE: 'traveller.review.list.pre.v1',
  LIST_PROCESS: 'traveller.review.list.process.v1',
  LIST_POST: 'traveller.review.list.post.v1',
  LISTD: 'traveller.review.listed.v1',


  UPDATE_PRE: 'traveller.review.update.pre.v1',
  UPDATE_PROCESS: 'traveller.review.update.process.v1',
  UPDATE_POST: 'traveller.review.update.post.v1',
  UPDATED: 'traveller.review.updated.v1',


  DELETE_PRE: 'traveller.review.delete.pre.v1',
  DELETE_PROCESS: 'traveller.review.delete.process.v1',
  DELETE_POST: 'traveller.review.delete.post.v1',
  DELETED: 'traveller.review.deleted.v1',

} as const;

export type ReviewEventName = (typeof REVIEW_EVENTS)[keyof typeof REVIEW_EVENTS];
