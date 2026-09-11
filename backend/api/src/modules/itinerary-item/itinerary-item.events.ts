export const ITINERARY_ITEM_EVENTS = {

  CREATE_PRE: 'traveller.itinerary-item.create.pre.v1',
  CREATE_PROCESS: 'traveller.itinerary-item.create.process.v1',
  CREATE_POST: 'traveller.itinerary-item.create.post.v1',
  CREATED: 'traveller.itinerary-item.created.v1',


  GET_PRE: 'traveller.itinerary-item.get.pre.v1',
  GET_PROCESS: 'traveller.itinerary-item.get.process.v1',
  GET_POST: 'traveller.itinerary-item.get.post.v1',
  GETD: 'traveller.itinerary-item.retrieved.v1',


  LIST_PRE: 'traveller.itinerary-item.list.pre.v1',
  LIST_PROCESS: 'traveller.itinerary-item.list.process.v1',
  LIST_POST: 'traveller.itinerary-item.list.post.v1',
  LISTD: 'traveller.itinerary-item.listed.v1',


  UPDATE_PRE: 'traveller.itinerary-item.update.pre.v1',
  UPDATE_PROCESS: 'traveller.itinerary-item.update.process.v1',
  UPDATE_POST: 'traveller.itinerary-item.update.post.v1',
  UPDATED: 'traveller.itinerary-item.updated.v1',


  DELETE_PRE: 'traveller.itinerary-item.delete.pre.v1',
  DELETE_PROCESS: 'traveller.itinerary-item.delete.process.v1',
  DELETE_POST: 'traveller.itinerary-item.delete.post.v1',
  DELETED: 'traveller.itinerary-item.deleted.v1',

} as const;

export type ItineraryItemEventName = (typeof ITINERARY_ITEM_EVENTS)[keyof typeof ITINERARY_ITEM_EVENTS];
