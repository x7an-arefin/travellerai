export const WAITLIST_EVENTS = {

  CREATE_PRE: 'traveller.waitlist.create.pre.v1',
  CREATE_PROCESS: 'traveller.waitlist.create.process.v1',
  CREATE_POST: 'traveller.waitlist.create.post.v1',
  CREATED: 'traveller.waitlist.created.v1',


  GET_PRE: 'traveller.waitlist.get.pre.v1',
  GET_PROCESS: 'traveller.waitlist.get.process.v1',
  GET_POST: 'traveller.waitlist.get.post.v1',
  GETD: 'traveller.waitlist.retrieved.v1',


  LIST_PRE: 'traveller.waitlist.list.pre.v1',
  LIST_PROCESS: 'traveller.waitlist.list.process.v1',
  LIST_POST: 'traveller.waitlist.list.post.v1',
  LISTD: 'traveller.waitlist.listed.v1',


  UPDATE_PRE: 'traveller.waitlist.update.pre.v1',
  UPDATE_PROCESS: 'traveller.waitlist.update.process.v1',
  UPDATE_POST: 'traveller.waitlist.update.post.v1',
  UPDATED: 'traveller.waitlist.updated.v1',


  DELETE_PRE: 'traveller.waitlist.delete.pre.v1',
  DELETE_PROCESS: 'traveller.waitlist.delete.process.v1',
  DELETE_POST: 'traveller.waitlist.delete.post.v1',
  DELETED: 'traveller.waitlist.deleted.v1',

} as const;

export type WaitlistEventName = (typeof WAITLIST_EVENTS)[keyof typeof WAITLIST_EVENTS];
