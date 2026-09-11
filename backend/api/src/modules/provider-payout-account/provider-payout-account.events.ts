export const PROVIDER_PAYOUT_ACCOUNT_EVENTS = {

  CREATE_PRE: 'traveller.provider-payout-account.create.pre.v1',
  CREATE_PROCESS: 'traveller.provider-payout-account.create.process.v1',
  CREATE_POST: 'traveller.provider-payout-account.create.post.v1',
  CREATED: 'traveller.provider-payout-account.created.v1',


  GET_PRE: 'traveller.provider-payout-account.get.pre.v1',
  GET_PROCESS: 'traveller.provider-payout-account.get.process.v1',
  GET_POST: 'traveller.provider-payout-account.get.post.v1',
  GETD: 'traveller.provider-payout-account.retrieved.v1',


  LIST_PRE: 'traveller.provider-payout-account.list.pre.v1',
  LIST_PROCESS: 'traveller.provider-payout-account.list.process.v1',
  LIST_POST: 'traveller.provider-payout-account.list.post.v1',
  LISTD: 'traveller.provider-payout-account.listed.v1',


  UPDATE_PRE: 'traveller.provider-payout-account.update.pre.v1',
  UPDATE_PROCESS: 'traveller.provider-payout-account.update.process.v1',
  UPDATE_POST: 'traveller.provider-payout-account.update.post.v1',
  UPDATED: 'traveller.provider-payout-account.updated.v1',


  DELETE_PRE: 'traveller.provider-payout-account.delete.pre.v1',
  DELETE_PROCESS: 'traveller.provider-payout-account.delete.process.v1',
  DELETE_POST: 'traveller.provider-payout-account.delete.post.v1',
  DELETED: 'traveller.provider-payout-account.deleted.v1',

} as const;

export type ProviderPayoutAccountEventName = (typeof PROVIDER_PAYOUT_ACCOUNT_EVENTS)[keyof typeof PROVIDER_PAYOUT_ACCOUNT_EVENTS];
