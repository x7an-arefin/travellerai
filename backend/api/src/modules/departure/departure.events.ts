export const DEPARTURE_EVENTS = {

  CREATE_PRE: 'traveller.departure.create.pre.v1',
  CREATE_PROCESS: 'traveller.departure.create.process.v1',
  CREATE_POST: 'traveller.departure.create.post.v1',
  CREATED: 'traveller.departure.created.v1',


  GET_PRE: 'traveller.departure.get.pre.v1',
  GET_PROCESS: 'traveller.departure.get.process.v1',
  GET_POST: 'traveller.departure.get.post.v1',
  GETD: 'traveller.departure.retrieved.v1',


  LIST_PRE: 'traveller.departure.list.pre.v1',
  LIST_PROCESS: 'traveller.departure.list.process.v1',
  LIST_POST: 'traveller.departure.list.post.v1',
  LISTD: 'traveller.departure.listed.v1',


  UPDATE_PRE: 'traveller.departure.update.pre.v1',
  UPDATE_PROCESS: 'traveller.departure.update.process.v1',
  UPDATE_POST: 'traveller.departure.update.post.v1',
  UPDATED: 'traveller.departure.updated.v1',


  DELETE_PRE: 'traveller.departure.delete.pre.v1',
  DELETE_PROCESS: 'traveller.departure.delete.process.v1',
  DELETE_POST: 'traveller.departure.delete.post.v1',
  DELETED: 'traveller.departure.deleted.v1',

} as const;

export type DepartureEventName = (typeof DEPARTURE_EVENTS)[keyof typeof DEPARTURE_EVENTS];
