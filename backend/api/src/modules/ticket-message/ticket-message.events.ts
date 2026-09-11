export const TICKET_MESSAGE_EVENTS = {

  CREATE_PRE: 'traveller.ticket-message.create.pre.v1',
  CREATE_PROCESS: 'traveller.ticket-message.create.process.v1',
  CREATE_POST: 'traveller.ticket-message.create.post.v1',
  CREATED: 'traveller.ticket-message.created.v1',


  GET_PRE: 'traveller.ticket-message.get.pre.v1',
  GET_PROCESS: 'traveller.ticket-message.get.process.v1',
  GET_POST: 'traveller.ticket-message.get.post.v1',
  GETD: 'traveller.ticket-message.retrieved.v1',


  LIST_PRE: 'traveller.ticket-message.list.pre.v1',
  LIST_PROCESS: 'traveller.ticket-message.list.process.v1',
  LIST_POST: 'traveller.ticket-message.list.post.v1',
  LISTD: 'traveller.ticket-message.listed.v1',


  UPDATE_PRE: 'traveller.ticket-message.update.pre.v1',
  UPDATE_PROCESS: 'traveller.ticket-message.update.process.v1',
  UPDATE_POST: 'traveller.ticket-message.update.post.v1',
  UPDATED: 'traveller.ticket-message.updated.v1',


  DELETE_PRE: 'traveller.ticket-message.delete.pre.v1',
  DELETE_PROCESS: 'traveller.ticket-message.delete.process.v1',
  DELETE_POST: 'traveller.ticket-message.delete.post.v1',
  DELETED: 'traveller.ticket-message.deleted.v1',

} as const;

export type TicketMessageEventName = (typeof TICKET_MESSAGE_EVENTS)[keyof typeof TICKET_MESSAGE_EVENTS];
