export const EXCHANGE_RATE_EVENTS = {

  CREATE_PRE: 'traveller.exchange-rate.create.pre.v1',
  CREATE_PROCESS: 'traveller.exchange-rate.create.process.v1',
  CREATE_POST: 'traveller.exchange-rate.create.post.v1',
  CREATED: 'traveller.exchange-rate.created.v1',


  GET_PRE: 'traveller.exchange-rate.get.pre.v1',
  GET_PROCESS: 'traveller.exchange-rate.get.process.v1',
  GET_POST: 'traveller.exchange-rate.get.post.v1',
  GETD: 'traveller.exchange-rate.retrieved.v1',


  LIST_PRE: 'traveller.exchange-rate.list.pre.v1',
  LIST_PROCESS: 'traveller.exchange-rate.list.process.v1',
  LIST_POST: 'traveller.exchange-rate.list.post.v1',
  LISTD: 'traveller.exchange-rate.listed.v1',


  UPDATE_PRE: 'traveller.exchange-rate.update.pre.v1',
  UPDATE_PROCESS: 'traveller.exchange-rate.update.process.v1',
  UPDATE_POST: 'traveller.exchange-rate.update.post.v1',
  UPDATED: 'traveller.exchange-rate.updated.v1',


  DELETE_PRE: 'traveller.exchange-rate.delete.pre.v1',
  DELETE_PROCESS: 'traveller.exchange-rate.delete.process.v1',
  DELETE_POST: 'traveller.exchange-rate.delete.post.v1',
  DELETED: 'traveller.exchange-rate.deleted.v1',

} as const;

export type ExchangeRateEventName = (typeof EXCHANGE_RATE_EVENTS)[keyof typeof EXCHANGE_RATE_EVENTS];
