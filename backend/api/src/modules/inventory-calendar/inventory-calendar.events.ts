export const INVENTORY_CALENDAR_EVENTS = {

  CREATE_PRE: 'traveller.inventory-calendar.create.pre.v1',
  CREATE_PROCESS: 'traveller.inventory-calendar.create.process.v1',
  CREATE_POST: 'traveller.inventory-calendar.create.post.v1',
  CREATED: 'traveller.inventory-calendar.created.v1',


  GET_PRE: 'traveller.inventory-calendar.get.pre.v1',
  GET_PROCESS: 'traveller.inventory-calendar.get.process.v1',
  GET_POST: 'traveller.inventory-calendar.get.post.v1',
  GETD: 'traveller.inventory-calendar.retrieved.v1',


  LIST_PRE: 'traveller.inventory-calendar.list.pre.v1',
  LIST_PROCESS: 'traveller.inventory-calendar.list.process.v1',
  LIST_POST: 'traveller.inventory-calendar.list.post.v1',
  LISTD: 'traveller.inventory-calendar.listed.v1',


  UPDATE_PRE: 'traveller.inventory-calendar.update.pre.v1',
  UPDATE_PROCESS: 'traveller.inventory-calendar.update.process.v1',
  UPDATE_POST: 'traveller.inventory-calendar.update.post.v1',
  UPDATED: 'traveller.inventory-calendar.updated.v1',


  DELETE_PRE: 'traveller.inventory-calendar.delete.pre.v1',
  DELETE_PROCESS: 'traveller.inventory-calendar.delete.process.v1',
  DELETE_POST: 'traveller.inventory-calendar.delete.post.v1',
  DELETED: 'traveller.inventory-calendar.deleted.v1',

} as const;

export type InventoryCalendarEventName = (typeof INVENTORY_CALENDAR_EVENTS)[keyof typeof INVENTORY_CALENDAR_EVENTS];
