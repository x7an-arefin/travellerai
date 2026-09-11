export const CUSTOMER_WALLET_EVENTS = {

  CREATE_PRE: 'traveller.customer-wallet.create.pre.v1',
  CREATE_PROCESS: 'traveller.customer-wallet.create.process.v1',
  CREATE_POST: 'traveller.customer-wallet.create.post.v1',
  CREATED: 'traveller.customer-wallet.created.v1',


  GET_PRE: 'traveller.customer-wallet.get.pre.v1',
  GET_PROCESS: 'traveller.customer-wallet.get.process.v1',
  GET_POST: 'traveller.customer-wallet.get.post.v1',
  GETD: 'traveller.customer-wallet.retrieved.v1',


  LIST_PRE: 'traveller.customer-wallet.list.pre.v1',
  LIST_PROCESS: 'traveller.customer-wallet.list.process.v1',
  LIST_POST: 'traveller.customer-wallet.list.post.v1',
  LISTD: 'traveller.customer-wallet.listed.v1',


  UPDATE_PRE: 'traveller.customer-wallet.update.pre.v1',
  UPDATE_PROCESS: 'traveller.customer-wallet.update.process.v1',
  UPDATE_POST: 'traveller.customer-wallet.update.post.v1',
  UPDATED: 'traveller.customer-wallet.updated.v1',

} as const;

export type CustomerWalletEventName = (typeof CUSTOMER_WALLET_EVENTS)[keyof typeof CUSTOMER_WALLET_EVENTS];
