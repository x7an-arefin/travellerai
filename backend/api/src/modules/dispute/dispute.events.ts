export const DISPUTE_EVENTS = {

  CREATE_PRE: 'traveller.dispute.create.pre.v1',
  CREATE_PROCESS: 'traveller.dispute.create.process.v1',
  CREATE_POST: 'traveller.dispute.create.post.v1',
  CREATED: 'traveller.dispute.created.v1',


  GET_PRE: 'traveller.dispute.get.pre.v1',
  GET_PROCESS: 'traveller.dispute.get.process.v1',
  GET_POST: 'traveller.dispute.get.post.v1',
  GETD: 'traveller.dispute.retrieved.v1',


  LIST_PRE: 'traveller.dispute.list.pre.v1',
  LIST_PROCESS: 'traveller.dispute.list.process.v1',
  LIST_POST: 'traveller.dispute.list.post.v1',
  LISTD: 'traveller.dispute.listed.v1',


  UPDATE_PRE: 'traveller.dispute.update.pre.v1',
  UPDATE_PROCESS: 'traveller.dispute.update.process.v1',
  UPDATE_POST: 'traveller.dispute.update.post.v1',
  UPDATED: 'traveller.dispute.updated.v1',


  DELETE_PRE: 'traveller.dispute.delete.pre.v1',
  DELETE_PROCESS: 'traveller.dispute.delete.process.v1',
  DELETE_POST: 'traveller.dispute.delete.post.v1',
  DELETED: 'traveller.dispute.deleted.v1',

} as const;

export type DisputeEventName = (typeof DISPUTE_EVENTS)[keyof typeof DISPUTE_EVENTS];
