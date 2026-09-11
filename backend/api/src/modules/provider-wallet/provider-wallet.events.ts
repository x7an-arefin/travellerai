export const PROVIDER_WALLET_EVENTS = {

  CREATE_PRE: 'traveller.provider-wallet.create.pre.v1',
  CREATE_PROCESS: 'traveller.provider-wallet.create.process.v1',
  CREATE_POST: 'traveller.provider-wallet.create.post.v1',
  CREATED: 'traveller.provider-wallet.created.v1',


  GET_PRE: 'traveller.provider-wallet.get.pre.v1',
  GET_PROCESS: 'traveller.provider-wallet.get.process.v1',
  GET_POST: 'traveller.provider-wallet.get.post.v1',
  GETD: 'traveller.provider-wallet.retrieved.v1',


  LIST_PRE: 'traveller.provider-wallet.list.pre.v1',
  LIST_PROCESS: 'traveller.provider-wallet.list.process.v1',
  LIST_POST: 'traveller.provider-wallet.list.post.v1',
  LISTD: 'traveller.provider-wallet.listed.v1',


  UPDATE_PRE: 'traveller.provider-wallet.update.pre.v1',
  UPDATE_PROCESS: 'traveller.provider-wallet.update.process.v1',
  UPDATE_POST: 'traveller.provider-wallet.update.post.v1',
  UPDATED: 'traveller.provider-wallet.updated.v1',

} as const;

export type ProviderWalletEventName = (typeof PROVIDER_WALLET_EVENTS)[keyof typeof PROVIDER_WALLET_EVENTS];
