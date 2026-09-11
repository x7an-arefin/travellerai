export const BOOKING_PARTICIPANT_EVENTS = {

  CREATE_PRE: 'traveller.booking-participant.create.pre.v1',
  CREATE_PROCESS: 'traveller.booking-participant.create.process.v1',
  CREATE_POST: 'traveller.booking-participant.create.post.v1',
  CREATED: 'traveller.booking-participant.created.v1',


  GET_PRE: 'traveller.booking-participant.get.pre.v1',
  GET_PROCESS: 'traveller.booking-participant.get.process.v1',
  GET_POST: 'traveller.booking-participant.get.post.v1',
  GETD: 'traveller.booking-participant.retrieved.v1',


  LIST_PRE: 'traveller.booking-participant.list.pre.v1',
  LIST_PROCESS: 'traveller.booking-participant.list.process.v1',
  LIST_POST: 'traveller.booking-participant.list.post.v1',
  LISTD: 'traveller.booking-participant.listed.v1',


  UPDATE_PRE: 'traveller.booking-participant.update.pre.v1',
  UPDATE_PROCESS: 'traveller.booking-participant.update.process.v1',
  UPDATE_POST: 'traveller.booking-participant.update.post.v1',
  UPDATED: 'traveller.booking-participant.updated.v1',


  DELETE_PRE: 'traveller.booking-participant.delete.pre.v1',
  DELETE_PROCESS: 'traveller.booking-participant.delete.process.v1',
  DELETE_POST: 'traveller.booking-participant.delete.post.v1',
  DELETED: 'traveller.booking-participant.deleted.v1',

} as const;

export type BookingParticipantEventName = (typeof BOOKING_PARTICIPANT_EVENTS)[keyof typeof BOOKING_PARTICIPANT_EVENTS];
