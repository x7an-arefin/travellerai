export const DESTINATION_EVENTS = {

  CREATE_PRE: 'traveller.destination.create.pre.v1',
  CREATE_PROCESS: 'traveller.destination.create.process.v1',
  CREATE_POST: 'traveller.destination.create.post.v1',
  CREATED: 'traveller.destination.created.v1',


  GET_PRE: 'traveller.destination.get.pre.v1',
  GET_PROCESS: 'traveller.destination.get.process.v1',
  GET_POST: 'traveller.destination.get.post.v1',
  GETD: 'traveller.destination.retrieved.v1',


  LIST_PRE: 'traveller.destination.list.pre.v1',
  LIST_PROCESS: 'traveller.destination.list.process.v1',
  LIST_POST: 'traveller.destination.list.post.v1',
  LISTD: 'traveller.destination.listed.v1',


  UPDATE_PRE: 'traveller.destination.update.pre.v1',
  UPDATE_PROCESS: 'traveller.destination.update.process.v1',
  UPDATE_POST: 'traveller.destination.update.post.v1',
  UPDATED: 'traveller.destination.updated.v1',


  DELETE_PRE: 'traveller.destination.delete.pre.v1',
  DELETE_PROCESS: 'traveller.destination.delete.process.v1',
  DELETE_POST: 'traveller.destination.delete.post.v1',
  DELETED: 'traveller.destination.deleted.v1',

} as const;

export type DestinationEventName = (typeof DESTINATION_EVENTS)[keyof typeof DESTINATION_EVENTS];
