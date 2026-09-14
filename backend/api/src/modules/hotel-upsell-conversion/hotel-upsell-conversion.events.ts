export const HOTEL_UPSELL_CONVERSION_EVENTS = {

  CREATE_PRE: 'traveller.hotel-upsell-conversion.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-upsell-conversion.create.process.v1',
  CREATE_POST: 'traveller.hotel-upsell-conversion.create.post.v1',
  CREATED: 'traveller.hotel-upsell-conversion.created.v1',


  GET_PRE: 'traveller.hotel-upsell-conversion.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-upsell-conversion.get.process.v1',
  GET_POST: 'traveller.hotel-upsell-conversion.get.post.v1',
  GETD: 'traveller.hotel-upsell-conversion.retrieved.v1',


  LIST_PRE: 'traveller.hotel-upsell-conversion.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-upsell-conversion.list.process.v1',
  LIST_POST: 'traveller.hotel-upsell-conversion.list.post.v1',
  LISTD: 'traveller.hotel-upsell-conversion.listed.v1',


  UPDATE_PRE: 'traveller.hotel-upsell-conversion.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-upsell-conversion.update.process.v1',
  UPDATE_POST: 'traveller.hotel-upsell-conversion.update.post.v1',
  UPDATED: 'traveller.hotel-upsell-conversion.updated.v1',


  DELETE_PRE: 'traveller.hotel-upsell-conversion.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-upsell-conversion.delete.process.v1',
  DELETE_POST: 'traveller.hotel-upsell-conversion.delete.post.v1',
  DELETED: 'traveller.hotel-upsell-conversion.deleted.v1',

} as const;

export type HotelUpsellConversionEventName = (typeof HOTEL_UPSELL_CONVERSION_EVENTS)[keyof typeof HOTEL_UPSELL_CONVERSION_EVENTS];
