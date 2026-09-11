export const PRICE_RULE_EVENTS = {

  CREATE_PRE: 'traveller.price-rule.create.pre.v1',
  CREATE_PROCESS: 'traveller.price-rule.create.process.v1',
  CREATE_POST: 'traveller.price-rule.create.post.v1',
  CREATED: 'traveller.price-rule.created.v1',


  GET_PRE: 'traveller.price-rule.get.pre.v1',
  GET_PROCESS: 'traveller.price-rule.get.process.v1',
  GET_POST: 'traveller.price-rule.get.post.v1',
  GETD: 'traveller.price-rule.retrieved.v1',


  LIST_PRE: 'traveller.price-rule.list.pre.v1',
  LIST_PROCESS: 'traveller.price-rule.list.process.v1',
  LIST_POST: 'traveller.price-rule.list.post.v1',
  LISTD: 'traveller.price-rule.listed.v1',


  UPDATE_PRE: 'traveller.price-rule.update.pre.v1',
  UPDATE_PROCESS: 'traveller.price-rule.update.process.v1',
  UPDATE_POST: 'traveller.price-rule.update.post.v1',
  UPDATED: 'traveller.price-rule.updated.v1',


  DELETE_PRE: 'traveller.price-rule.delete.pre.v1',
  DELETE_PROCESS: 'traveller.price-rule.delete.process.v1',
  DELETE_POST: 'traveller.price-rule.delete.post.v1',
  DELETED: 'traveller.price-rule.deleted.v1',

} as const;

export type PriceRuleEventName = (typeof PRICE_RULE_EVENTS)[keyof typeof PRICE_RULE_EVENTS];
