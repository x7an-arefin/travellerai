export const HOTEL_PROPERTY_EVENTS = {

  CREATE_PRE: 'traveller.hotel-property.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-property.create.process.v1',
  CREATE_POST: 'traveller.hotel-property.create.post.v1',
  CREATED: 'traveller.hotel-property.created.v1',


  GET_PRE: 'traveller.hotel-property.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-property.get.process.v1',
  GET_POST: 'traveller.hotel-property.get.post.v1',
  GETD: 'traveller.hotel-property.retrieved.v1',


  LIST_PRE: 'traveller.hotel-property.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-property.list.process.v1',
  LIST_POST: 'traveller.hotel-property.list.post.v1',
  LISTD: 'traveller.hotel-property.listed.v1',


  UPDATE_PRE: 'traveller.hotel-property.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-property.update.process.v1',
  UPDATE_POST: 'traveller.hotel-property.update.post.v1',
  UPDATED: 'traveller.hotel-property.updated.v1',


  DELETE_PRE: 'traveller.hotel-property.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-property.delete.process.v1',
  DELETE_POST: 'traveller.hotel-property.delete.post.v1',
  DELETED: 'traveller.hotel-property.deleted.v1',

} as const;

export type HotelPropertyEventName = (typeof HOTEL_PROPERTY_EVENTS)[keyof typeof HOTEL_PROPERTY_EVENTS];
