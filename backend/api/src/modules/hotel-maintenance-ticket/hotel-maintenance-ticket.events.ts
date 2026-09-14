export const HOTEL_MAINTENANCE_TICKET_EVENTS = {

  CREATE_PRE: 'traveller.hotel-maintenance-ticket.create.pre.v1',
  CREATE_PROCESS: 'traveller.hotel-maintenance-ticket.create.process.v1',
  CREATE_POST: 'traveller.hotel-maintenance-ticket.create.post.v1',
  CREATED: 'traveller.hotel-maintenance-ticket.created.v1',


  GET_PRE: 'traveller.hotel-maintenance-ticket.get.pre.v1',
  GET_PROCESS: 'traveller.hotel-maintenance-ticket.get.process.v1',
  GET_POST: 'traveller.hotel-maintenance-ticket.get.post.v1',
  GETD: 'traveller.hotel-maintenance-ticket.retrieved.v1',


  LIST_PRE: 'traveller.hotel-maintenance-ticket.list.pre.v1',
  LIST_PROCESS: 'traveller.hotel-maintenance-ticket.list.process.v1',
  LIST_POST: 'traveller.hotel-maintenance-ticket.list.post.v1',
  LISTD: 'traveller.hotel-maintenance-ticket.listed.v1',


  UPDATE_PRE: 'traveller.hotel-maintenance-ticket.update.pre.v1',
  UPDATE_PROCESS: 'traveller.hotel-maintenance-ticket.update.process.v1',
  UPDATE_POST: 'traveller.hotel-maintenance-ticket.update.post.v1',
  UPDATED: 'traveller.hotel-maintenance-ticket.updated.v1',


  DELETE_PRE: 'traveller.hotel-maintenance-ticket.delete.pre.v1',
  DELETE_PROCESS: 'traveller.hotel-maintenance-ticket.delete.process.v1',
  DELETE_POST: 'traveller.hotel-maintenance-ticket.delete.post.v1',
  DELETED: 'traveller.hotel-maintenance-ticket.deleted.v1',

} as const;

export type HotelMaintenanceTicketEventName = (typeof HOTEL_MAINTENANCE_TICKET_EVENTS)[keyof typeof HOTEL_MAINTENANCE_TICKET_EVENTS];
