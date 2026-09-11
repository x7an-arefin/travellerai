export const REFUND_REQUEST_EVENTS = {

  CREATE_PRE: 'traveller.refund-request.create.pre.v1',
  CREATE_PROCESS: 'traveller.refund-request.create.process.v1',
  CREATE_POST: 'traveller.refund-request.create.post.v1',
  CREATED: 'traveller.refund-request.created.v1',


  GET_PRE: 'traveller.refund-request.get.pre.v1',
  GET_PROCESS: 'traveller.refund-request.get.process.v1',
  GET_POST: 'traveller.refund-request.get.post.v1',
  GETD: 'traveller.refund-request.retrieved.v1',


  LIST_PRE: 'traveller.refund-request.list.pre.v1',
  LIST_PROCESS: 'traveller.refund-request.list.process.v1',
  LIST_POST: 'traveller.refund-request.list.post.v1',
  LISTD: 'traveller.refund-request.listed.v1',


  UPDATE_PRE: 'traveller.refund-request.update.pre.v1',
  UPDATE_PROCESS: 'traveller.refund-request.update.process.v1',
  UPDATE_POST: 'traveller.refund-request.update.post.v1',
  UPDATED: 'traveller.refund-request.updated.v1',


  DELETE_PRE: 'traveller.refund-request.delete.pre.v1',
  DELETE_PROCESS: 'traveller.refund-request.delete.process.v1',
  DELETE_POST: 'traveller.refund-request.delete.post.v1',
  DELETED: 'traveller.refund-request.deleted.v1',

} as const;

export type RefundRequestEventName = (typeof REFUND_REQUEST_EVENTS)[keyof typeof REFUND_REQUEST_EVENTS];
