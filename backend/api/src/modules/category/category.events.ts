export const CATEGORY_EVENTS = {

  CREATE_PRE: 'traveller.category.create.pre.v1',
  CREATE_PROCESS: 'traveller.category.create.process.v1',
  CREATE_POST: 'traveller.category.create.post.v1',
  CREATED: 'traveller.category.created.v1',


  GET_PRE: 'traveller.category.get.pre.v1',
  GET_PROCESS: 'traveller.category.get.process.v1',
  GET_POST: 'traveller.category.get.post.v1',
  GETD: 'traveller.category.retrieved.v1',


  LIST_PRE: 'traveller.category.list.pre.v1',
  LIST_PROCESS: 'traveller.category.list.process.v1',
  LIST_POST: 'traveller.category.list.post.v1',
  LISTD: 'traveller.category.listed.v1',


  UPDATE_PRE: 'traveller.category.update.pre.v1',
  UPDATE_PROCESS: 'traveller.category.update.process.v1',
  UPDATE_POST: 'traveller.category.update.post.v1',
  UPDATED: 'traveller.category.updated.v1',


  DELETE_PRE: 'traveller.category.delete.pre.v1',
  DELETE_PROCESS: 'traveller.category.delete.process.v1',
  DELETE_POST: 'traveller.category.delete.post.v1',
  DELETED: 'traveller.category.deleted.v1',

} as const;

export type CategoryEventName = (typeof CATEGORY_EVENTS)[keyof typeof CATEGORY_EVENTS];
