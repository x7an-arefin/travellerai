export const BOOKING_ADDON_ITEM_EVENTS = {

  CREATE_PRE: 'traveller.booking-addon-item.create.pre.v1',
  CREATE_PROCESS: 'traveller.booking-addon-item.create.process.v1',
  CREATE_POST: 'traveller.booking-addon-item.create.post.v1',
  CREATED: 'traveller.booking-addon-item.created.v1',


  GET_PRE: 'traveller.booking-addon-item.get.pre.v1',
  GET_PROCESS: 'traveller.booking-addon-item.get.process.v1',
  GET_POST: 'traveller.booking-addon-item.get.post.v1',
  GETD: 'traveller.booking-addon-item.retrieved.v1',


  LIST_PRE: 'traveller.booking-addon-item.list.pre.v1',
  LIST_PROCESS: 'traveller.booking-addon-item.list.process.v1',
  LIST_POST: 'traveller.booking-addon-item.list.post.v1',
  LISTD: 'traveller.booking-addon-item.listed.v1',


  UPDATE_PRE: 'traveller.booking-addon-item.update.pre.v1',
  UPDATE_PROCESS: 'traveller.booking-addon-item.update.process.v1',
  UPDATE_POST: 'traveller.booking-addon-item.update.post.v1',
  UPDATED: 'traveller.booking-addon-item.updated.v1',


  DELETE_PRE: 'traveller.booking-addon-item.delete.pre.v1',
  DELETE_PROCESS: 'traveller.booking-addon-item.delete.process.v1',
  DELETE_POST: 'traveller.booking-addon-item.delete.post.v1',
  DELETED: 'traveller.booking-addon-item.deleted.v1',

} as const;

export type BookingAddonItemEventName = (typeof BOOKING_ADDON_ITEM_EVENTS)[keyof typeof BOOKING_ADDON_ITEM_EVENTS];
