export const AFFILIATE_ACCOUNT_EVENTS = {

  CREATE_PRE: 'traveller.affiliate-account.create.pre.v1',
  CREATE_PROCESS: 'traveller.affiliate-account.create.process.v1',
  CREATE_POST: 'traveller.affiliate-account.create.post.v1',
  CREATED: 'traveller.affiliate-account.created.v1',


  GET_PRE: 'traveller.affiliate-account.get.pre.v1',
  GET_PROCESS: 'traveller.affiliate-account.get.process.v1',
  GET_POST: 'traveller.affiliate-account.get.post.v1',
  GETD: 'traveller.affiliate-account.retrieved.v1',


  LIST_PRE: 'traveller.affiliate-account.list.pre.v1',
  LIST_PROCESS: 'traveller.affiliate-account.list.process.v1',
  LIST_POST: 'traveller.affiliate-account.list.post.v1',
  LISTD: 'traveller.affiliate-account.listed.v1',


  UPDATE_PRE: 'traveller.affiliate-account.update.pre.v1',
  UPDATE_PROCESS: 'traveller.affiliate-account.update.process.v1',
  UPDATE_POST: 'traveller.affiliate-account.update.post.v1',
  UPDATED: 'traveller.affiliate-account.updated.v1',


  DELETE_PRE: 'traveller.affiliate-account.delete.pre.v1',
  DELETE_PROCESS: 'traveller.affiliate-account.delete.process.v1',
  DELETE_POST: 'traveller.affiliate-account.delete.post.v1',
  DELETED: 'traveller.affiliate-account.deleted.v1',

} as const;

export type AffiliateAccountEventName = (typeof AFFILIATE_ACCOUNT_EVENTS)[keyof typeof AFFILIATE_ACCOUNT_EVENTS];
