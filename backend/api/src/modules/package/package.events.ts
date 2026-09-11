export const PACKAGE_EVENTS = {

  CREATE_PRE: 'traveller.package.create.pre.v1',
  CREATE_PROCESS: 'traveller.package.create.process.v1',
  CREATE_POST: 'traveller.package.create.post.v1',
  CREATED: 'traveller.package.created.v1',


  GET_PRE: 'traveller.package.get.pre.v1',
  GET_PROCESS: 'traveller.package.get.process.v1',
  GET_POST: 'traveller.package.get.post.v1',
  GETD: 'traveller.package.retrieved.v1',


  LIST_PRE: 'traveller.package.list.pre.v1',
  LIST_PROCESS: 'traveller.package.list.process.v1',
  LIST_POST: 'traveller.package.list.post.v1',
  LISTD: 'traveller.package.listed.v1',


  UPDATE_PRE: 'traveller.package.update.pre.v1',
  UPDATE_PROCESS: 'traveller.package.update.process.v1',
  UPDATE_POST: 'traveller.package.update.post.v1',
  UPDATED: 'traveller.package.updated.v1',


  DELETE_PRE: 'traveller.package.delete.pre.v1',
  DELETE_PROCESS: 'traveller.package.delete.process.v1',
  DELETE_POST: 'traveller.package.delete.post.v1',
  DELETED: 'traveller.package.deleted.v1',

} as const;

export type PackageEventName = (typeof PACKAGE_EVENTS)[keyof typeof PACKAGE_EVENTS];
