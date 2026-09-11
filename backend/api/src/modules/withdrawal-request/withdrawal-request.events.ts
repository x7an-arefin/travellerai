export const WITHDRAWAL_REQUEST_EVENTS = {

  CREATE_PRE: 'traveller.withdrawal-request.create.pre.v1',
  CREATE_PROCESS: 'traveller.withdrawal-request.create.process.v1',
  CREATE_POST: 'traveller.withdrawal-request.create.post.v1',
  CREATED: 'traveller.withdrawal-request.created.v1',


  GET_PRE: 'traveller.withdrawal-request.get.pre.v1',
  GET_PROCESS: 'traveller.withdrawal-request.get.process.v1',
  GET_POST: 'traveller.withdrawal-request.get.post.v1',
  GETD: 'traveller.withdrawal-request.retrieved.v1',


  LIST_PRE: 'traveller.withdrawal-request.list.pre.v1',
  LIST_PROCESS: 'traveller.withdrawal-request.list.process.v1',
  LIST_POST: 'traveller.withdrawal-request.list.post.v1',
  LISTD: 'traveller.withdrawal-request.listed.v1',


  UPDATE_PRE: 'traveller.withdrawal-request.update.pre.v1',
  UPDATE_PROCESS: 'traveller.withdrawal-request.update.process.v1',
  UPDATE_POST: 'traveller.withdrawal-request.update.post.v1',
  UPDATED: 'traveller.withdrawal-request.updated.v1',


  DELETE_PRE: 'traveller.withdrawal-request.delete.pre.v1',
  DELETE_PROCESS: 'traveller.withdrawal-request.delete.process.v1',
  DELETE_POST: 'traveller.withdrawal-request.delete.post.v1',
  DELETED: 'traveller.withdrawal-request.deleted.v1',

} as const;

export type WithdrawalRequestEventName = (typeof WITHDRAWAL_REQUEST_EVENTS)[keyof typeof WITHDRAWAL_REQUEST_EVENTS];
