export const GIFT_CARD_EVENTS = {

  CREATE_PRE: 'traveller.gift-card.create.pre.v1',
  CREATE_PROCESS: 'traveller.gift-card.create.process.v1',
  CREATE_POST: 'traveller.gift-card.create.post.v1',
  CREATED: 'traveller.gift-card.created.v1',


  GET_PRE: 'traveller.gift-card.get.pre.v1',
  GET_PROCESS: 'traveller.gift-card.get.process.v1',
  GET_POST: 'traveller.gift-card.get.post.v1',
  GETD: 'traveller.gift-card.retrieved.v1',


  LIST_PRE: 'traveller.gift-card.list.pre.v1',
  LIST_PROCESS: 'traveller.gift-card.list.process.v1',
  LIST_POST: 'traveller.gift-card.list.post.v1',
  LISTD: 'traveller.gift-card.listed.v1',


  UPDATE_PRE: 'traveller.gift-card.update.pre.v1',
  UPDATE_PROCESS: 'traveller.gift-card.update.process.v1',
  UPDATE_POST: 'traveller.gift-card.update.post.v1',
  UPDATED: 'traveller.gift-card.updated.v1',


  DELETE_PRE: 'traveller.gift-card.delete.pre.v1',
  DELETE_PROCESS: 'traveller.gift-card.delete.process.v1',
  DELETE_POST: 'traveller.gift-card.delete.post.v1',
  DELETED: 'traveller.gift-card.deleted.v1',

} as const;

export type GiftCardEventName = (typeof GIFT_CARD_EVENTS)[keyof typeof GIFT_CARD_EVENTS];
