export const USER_EVENTS = {

  CREATE_PRE: 'traveller.user.create.pre.v1',
  CREATE_PROCESS: 'traveller.user.create.process.v1',
  CREATE_POST: 'traveller.user.create.post.v1',
  CREATED: 'traveller.user.created.v1',


  GET_PRE: 'traveller.user.get.pre.v1',
  GET_PROCESS: 'traveller.user.get.process.v1',
  GET_POST: 'traveller.user.get.post.v1',
  GETD: 'traveller.user.retrieved.v1',


  LIST_PRE: 'traveller.user.list.pre.v1',
  LIST_PROCESS: 'traveller.user.list.process.v1',
  LIST_POST: 'traveller.user.list.post.v1',
  LISTD: 'traveller.user.listed.v1',


  UPDATE_PRE: 'traveller.user.update.pre.v1',
  UPDATE_PROCESS: 'traveller.user.update.process.v1',
  UPDATE_POST: 'traveller.user.update.post.v1',
  UPDATED: 'traveller.user.updated.v1',


  DELETE_PRE: 'traveller.user.delete.pre.v1',
  DELETE_PROCESS: 'traveller.user.delete.process.v1',
  DELETE_POST: 'traveller.user.delete.post.v1',
  DELETED: 'traveller.user.deleted.v1',

} as const;

export type UserEventName = (typeof USER_EVENTS)[keyof typeof USER_EVENTS];
