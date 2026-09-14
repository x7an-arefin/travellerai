export const HOTEL_GUEST_FOLIO_EVENTS = {

  CREATE_PRE: 'traveller.hotel-guest-folio.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-guest-folio.create.process.v1',
  CREATE_POST: 'traveller.hotel-guest-folio.create.post.v1',
  CREATED: 'traveller.hotel-guest-folio.created.v1',


  GET_PRE: 'traveller.hotel-guest-folio.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-guest-folio.get.process.v1',
  GET_POST: 'traveller.hotel-guest-folio.get.post.v1',
  GETD: 'traveller.hotel-guest-folio.retrieved.v1',


  LIST_PRE: 'traveller.hotel-guest-folio.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-guest-folio.list.process.v1',
  LIST_POST: 'traveller.hotel-guest-folio.list.post.v1',
  LISTD: 'traveller.hotel-guest-folio.listed.v1',


  UPDATE_PRE: 'traveller.hotel-guest-folio.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-guest-folio.update.process.v1',
  UPDATE_POST: 'traveller.hotel-guest-folio.update.post.v1',
  UPDATED: 'traveller.hotel-guest-folio.updated.v1',


  DELETE_PRE: 'traveller.hotel-guest-folio.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-guest-folio.delete.process.v1',
  DELETE_POST: 'traveller.hotel-guest-folio.delete.post.v1',
  DELETED: 'traveller.hotel-guest-folio.deleted.v1',

} as const;

export type HotelGuestFolioEventName = (typeof HOTEL_GUEST_FOLIO_EVENTS)[keyof typeof HOTEL_GUEST_FOLIO_EVENTS];
