export const PROPERTY_AMENITY_EVENTS = {

  CREATE_PRE: 'traveller.property-amenity.create.pre.v1',
  CREATE_PROCESS: 'traveller.property-amenity.create.process.v1',
  CREATE_POST: 'traveller.property-amenity.create.post.v1',
  CREATED: 'traveller.property-amenity.created.v1',


  GET_PRE: 'traveller.property-amenity.get.pre.v1',
  GET_PROCESS: 'traveller.property-amenity.get.process.v1',
  GET_POST: 'traveller.property-amenity.get.post.v1',
  GETD: 'traveller.property-amenity.retrieved.v1',


  LIST_PRE: 'traveller.property-amenity.list.pre.v1',
  LIST_PROCESS: 'traveller.property-amenity.list.process.v1',
  LIST_POST: 'traveller.property-amenity.list.post.v1',
  LISTD: 'traveller.property-amenity.listed.v1',


  UPDATE_PRE: 'traveller.property-amenity.update.pre.v1',
  UPDATE_PROCESS: 'traveller.property-amenity.update.process.v1',
  UPDATE_POST: 'traveller.property-amenity.update.post.v1',
  UPDATED: 'traveller.property-amenity.updated.v1',


  DELETE_PRE: 'traveller.property-amenity.delete.pre.v1',
  DELETE_PROCESS: 'traveller.property-amenity.delete.process.v1',
  DELETE_POST: 'traveller.property-amenity.delete.post.v1',
  DELETED: 'traveller.property-amenity.deleted.v1',

} as const;

export type PropertyAmenityEventName = (typeof PROPERTY_AMENITY_EVENTS)[keyof typeof PROPERTY_AMENITY_EVENTS];
