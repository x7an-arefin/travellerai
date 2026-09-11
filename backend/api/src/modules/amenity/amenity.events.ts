export const AMENITY_EVENTS = {

  CREATE_PRE: 'traveller.amenity.create.pre.v1',
  CREATE_PROCESS: 'traveller.amenity.create.process.v1',
  CREATE_POST: 'traveller.amenity.create.post.v1',
  CREATED: 'traveller.amenity.created.v1',


  GET_PRE: 'traveller.amenity.get.pre.v1',
  GET_PROCESS: 'traveller.amenity.get.process.v1',
  GET_POST: 'traveller.amenity.get.post.v1',
  GETD: 'traveller.amenity.retrieved.v1',


  LIST_PRE: 'traveller.amenity.list.pre.v1',
  LIST_PROCESS: 'traveller.amenity.list.process.v1',
  LIST_POST: 'traveller.amenity.list.post.v1',
  LISTD: 'traveller.amenity.listed.v1',


  UPDATE_PRE: 'traveller.amenity.update.pre.v1',
  UPDATE_PROCESS: 'traveller.amenity.update.process.v1',
  UPDATE_POST: 'traveller.amenity.update.post.v1',
  UPDATED: 'traveller.amenity.updated.v1',


  DELETE_PRE: 'traveller.amenity.delete.pre.v1',
  DELETE_PROCESS: 'traveller.amenity.delete.process.v1',
  DELETE_POST: 'traveller.amenity.delete.post.v1',
  DELETED: 'traveller.amenity.deleted.v1',

} as const;

export type AmenityEventName = (typeof AMENITY_EVENTS)[keyof typeof AMENITY_EVENTS];
