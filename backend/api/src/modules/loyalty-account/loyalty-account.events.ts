export const LOYALTY_ACCOUNT_EVENTS = {

  CREATE_PRE: 'traveller.loyalty-account.create.pre.v1',
  CREATE_PROCESS: 'traveller.loyalty-account.create.process.v1',
  CREATE_POST: 'traveller.loyalty-account.create.post.v1',
  CREATED: 'traveller.loyalty-account.created.v1',


  GET_PRE: 'traveller.loyalty-account.get.pre.v1',
  GET_PROCESS: 'traveller.loyalty-account.get.process.v1',
  GET_POST: 'traveller.loyalty-account.get.post.v1',
  GETD: 'traveller.loyalty-account.retrieved.v1',


  LIST_PRE: 'traveller.loyalty-account.list.pre.v1',
  LIST_PROCESS: 'traveller.loyalty-account.list.process.v1',
  LIST_POST: 'traveller.loyalty-account.list.post.v1',
  LISTD: 'traveller.loyalty-account.listed.v1',


  UPDATE_PRE: 'traveller.loyalty-account.update.pre.v1',
  UPDATE_PROCESS: 'traveller.loyalty-account.update.process.v1',
  UPDATE_POST: 'traveller.loyalty-account.update.post.v1',
  UPDATED: 'traveller.loyalty-account.updated.v1',

} as const;

export type LoyaltyAccountEventName = (typeof LOYALTY_ACCOUNT_EVENTS)[keyof typeof LOYALTY_ACCOUNT_EVENTS];
