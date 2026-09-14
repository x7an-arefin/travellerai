export const HOTEL_UPSELL_OFFER_EVENTS = {

  CREATE_PRE: 'traveller.hotel-upsell-offer.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-upsell-offer.create.process.v1',
  CREATE_POST: 'traveller.hotel-upsell-offer.create.post.v1',
  CREATED: 'traveller.hotel-upsell-offer.created.v1',


  GET_PRE: 'traveller.hotel-upsell-offer.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-upsell-offer.get.process.v1',
  GET_POST: 'traveller.hotel-upsell-offer.get.post.v1',
  GETD: 'traveller.hotel-upsell-offer.retrieved.v1',


  LIST_PRE: 'traveller.hotel-upsell-offer.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-upsell-offer.list.process.v1',
  LIST_POST: 'traveller.hotel-upsell-offer.list.post.v1',
  LISTD: 'traveller.hotel-upsell-offer.listed.v1',


  UPDATE_PRE: 'traveller.hotel-upsell-offer.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-upsell-offer.update.process.v1',
  UPDATE_POST: 'traveller.hotel-upsell-offer.update.post.v1',
  UPDATED: 'traveller.hotel-upsell-offer.updated.v1',


  DELETE_PRE: 'traveller.hotel-upsell-offer.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-upsell-offer.delete.process.v1',
  DELETE_POST: 'traveller.hotel-upsell-offer.delete.post.v1',
  DELETED: 'traveller.hotel-upsell-offer.deleted.v1',

} as const;

export type HotelUpsellOfferEventName = (typeof HOTEL_UPSELL_OFFER_EVENTS)[keyof typeof HOTEL_UPSELL_OFFER_EVENTS];
