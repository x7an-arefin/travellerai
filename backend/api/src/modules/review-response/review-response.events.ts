export const REVIEW_RESPONSE_EVENTS = {

  CREATE_PRE: 'traveller.review-response.create.pre.v1',
  CREATE_PROCESS: 'traveller.review-response.create.process.v1',
  CREATE_POST: 'traveller.review-response.create.post.v1',
  CREATED: 'traveller.review-response.created.v1',


  GET_PRE: 'traveller.review-response.get.pre.v1',
  GET_PROCESS: 'traveller.review-response.get.process.v1',
  GET_POST: 'traveller.review-response.get.post.v1',
  GETD: 'traveller.review-response.retrieved.v1',


  LIST_PRE: 'traveller.review-response.list.pre.v1',
  LIST_PROCESS: 'traveller.review-response.list.process.v1',
  LIST_POST: 'traveller.review-response.list.post.v1',
  LISTD: 'traveller.review-response.listed.v1',


  UPDATE_PRE: 'traveller.review-response.update.pre.v1',
  UPDATE_PROCESS: 'traveller.review-response.update.process.v1',
  UPDATE_POST: 'traveller.review-response.update.post.v1',
  UPDATED: 'traveller.review-response.updated.v1',


  DELETE_PRE: 'traveller.review-response.delete.pre.v1',
  DELETE_PROCESS: 'traveller.review-response.delete.process.v1',
  DELETE_POST: 'traveller.review-response.delete.post.v1',
  DELETED: 'traveller.review-response.deleted.v1',

} as const;

export type ReviewResponseEventName = (typeof REVIEW_RESPONSE_EVENTS)[keyof typeof REVIEW_RESPONSE_EVENTS];
