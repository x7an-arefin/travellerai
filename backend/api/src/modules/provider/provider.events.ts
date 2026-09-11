export const PROVIDER_EVENTS = {

  CREATE_PRE: 'traveller.provider.create.pre.v1',
  CREATE_PROCESS: 'traveller.provider.create.process.v1',
  CREATE_POST: 'traveller.provider.create.post.v1',
  CREATED: 'traveller.provider.created.v1',


  GET_PRE: 'traveller.provider.get.pre.v1',
  GET_PROCESS: 'traveller.provider.get.process.v1',
  GET_POST: 'traveller.provider.get.post.v1',
  GETD: 'traveller.provider.retrieved.v1',


  LIST_PRE: 'traveller.provider.list.pre.v1',
  LIST_PROCESS: 'traveller.provider.list.process.v1',
  LIST_POST: 'traveller.provider.list.post.v1',
  LISTD: 'traveller.provider.listed.v1',


  UPDATE_PRE: 'traveller.provider.update.pre.v1',
  UPDATE_PROCESS: 'traveller.provider.update.process.v1',
  UPDATE_POST: 'traveller.provider.update.post.v1',
  UPDATED: 'traveller.provider.updated.v1',


  DELETE_PRE: 'traveller.provider.delete.pre.v1',
  DELETE_PROCESS: 'traveller.provider.delete.process.v1',
  DELETE_POST: 'traveller.provider.delete.post.v1',
  DELETED: 'traveller.provider.deleted.v1',

} as const;

export type ProviderEventName = (typeof PROVIDER_EVENTS)[keyof typeof PROVIDER_EVENTS];
