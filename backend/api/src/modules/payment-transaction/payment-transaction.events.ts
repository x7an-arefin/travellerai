export const PAYMENT_TRANSACTION_EVENTS = {

  CREATE_PRE: 'traveller.payment-transaction.create.pre.v1',
  CREATE_PROCESS: 'traveller.payment-transaction.create.process.v1',
  CREATE_POST: 'traveller.payment-transaction.create.post.v1',
  CREATED: 'traveller.payment-transaction.created.v1',


  GET_PRE: 'traveller.payment-transaction.get.pre.v1',
  GET_PROCESS: 'traveller.payment-transaction.get.process.v1',
  GET_POST: 'traveller.payment-transaction.get.post.v1',
  GETD: 'traveller.payment-transaction.retrieved.v1',


  LIST_PRE: 'traveller.payment-transaction.list.pre.v1',
  LIST_PROCESS: 'traveller.payment-transaction.list.process.v1',
  LIST_POST: 'traveller.payment-transaction.list.post.v1',
  LISTD: 'traveller.payment-transaction.listed.v1',


  UPDATE_PRE: 'traveller.payment-transaction.update.pre.v1',
  UPDATE_PROCESS: 'traveller.payment-transaction.update.process.v1',
  UPDATE_POST: 'traveller.payment-transaction.update.post.v1',
  UPDATED: 'traveller.payment-transaction.updated.v1',


  DELETE_PRE: 'traveller.payment-transaction.delete.pre.v1',
  DELETE_PROCESS: 'traveller.payment-transaction.delete.process.v1',
  DELETE_POST: 'traveller.payment-transaction.delete.post.v1',
  DELETED: 'traveller.payment-transaction.deleted.v1',

} as const;

export type PaymentTransactionEventName = (typeof PAYMENT_TRANSACTION_EVENTS)[keyof typeof PAYMENT_TRANSACTION_EVENTS];
