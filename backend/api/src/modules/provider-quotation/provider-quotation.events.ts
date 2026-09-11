export const PROVIDER_QUOTATION_EVENTS = {

  CREATE_PRE: 'traveller.provider-quotation.create.pre.v1',
  CREATE_PROCESS: 'traveller.provider-quotation.create.process.v1',
  CREATE_POST: 'traveller.provider-quotation.create.post.v1',
  CREATED: 'traveller.provider-quotation.created.v1',


  GET_PRE: 'traveller.provider-quotation.get.pre.v1',
  GET_PROCESS: 'traveller.provider-quotation.get.process.v1',
  GET_POST: 'traveller.provider-quotation.get.post.v1',
  GETD: 'traveller.provider-quotation.retrieved.v1',


  LIST_PRE: 'traveller.provider-quotation.list.pre.v1',
  LIST_PROCESS: 'traveller.provider-quotation.list.process.v1',
  LIST_POST: 'traveller.provider-quotation.list.post.v1',
  LISTD: 'traveller.provider-quotation.listed.v1',


  UPDATE_PRE: 'traveller.provider-quotation.update.pre.v1',
  UPDATE_PROCESS: 'traveller.provider-quotation.update.process.v1',
  UPDATE_POST: 'traveller.provider-quotation.update.post.v1',
  UPDATED: 'traveller.provider-quotation.updated.v1',


  DELETE_PRE: 'traveller.provider-quotation.delete.pre.v1',
  DELETE_PROCESS: 'traveller.provider-quotation.delete.process.v1',
  DELETE_POST: 'traveller.provider-quotation.delete.post.v1',
  DELETED: 'traveller.provider-quotation.deleted.v1',

} as const;

export type ProviderQuotationEventName = (typeof PROVIDER_QUOTATION_EVENTS)[keyof typeof PROVIDER_QUOTATION_EVENTS];
