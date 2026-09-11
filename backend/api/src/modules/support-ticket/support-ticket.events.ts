export const SUPPORT_TICKET_EVENTS = {

  CREATE_PRE: 'traveller.support-ticket.create.pre.v1',
  CREATE_PROCESS: 'traveller.support-ticket.create.process.v1',
  CREATE_POST: 'traveller.support-ticket.create.post.v1',
  CREATED: 'traveller.support-ticket.created.v1',


  GET_PRE: 'traveller.support-ticket.get.pre.v1',
  GET_PROCESS: 'traveller.support-ticket.get.process.v1',
  GET_POST: 'traveller.support-ticket.get.post.v1',
  GETD: 'traveller.support-ticket.retrieved.v1',


  LIST_PRE: 'traveller.support-ticket.list.pre.v1',
  LIST_PROCESS: 'traveller.support-ticket.list.process.v1',
  LIST_POST: 'traveller.support-ticket.list.post.v1',
  LISTD: 'traveller.support-ticket.listed.v1',


  UPDATE_PRE: 'traveller.support-ticket.update.pre.v1',
  UPDATE_PROCESS: 'traveller.support-ticket.update.process.v1',
  UPDATE_POST: 'traveller.support-ticket.update.post.v1',
  UPDATED: 'traveller.support-ticket.updated.v1',


  DELETE_PRE: 'traveller.support-ticket.delete.pre.v1',
  DELETE_PROCESS: 'traveller.support-ticket.delete.process.v1',
  DELETE_POST: 'traveller.support-ticket.delete.post.v1',
  DELETED: 'traveller.support-ticket.deleted.v1',

} as const;

export type SupportTicketEventName = (typeof SUPPORT_TICKET_EVENTS)[keyof typeof SUPPORT_TICKET_EVENTS];
