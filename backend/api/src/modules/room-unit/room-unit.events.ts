export const ROOM_UNIT_EVENTS = {

  CREATE_PRE: 'traveller.room-unit.create.pre.v1',
  CREATE_PROCESS: 'traveller.room-unit.create.process.v1',
  CREATE_POST: 'traveller.room-unit.create.post.v1',
  CREATED: 'traveller.room-unit.created.v1',


  GET_PRE: 'traveller.room-unit.get.pre.v1',
  GET_PROCESS: 'traveller.room-unit.get.process.v1',
  GET_POST: 'traveller.room-unit.get.post.v1',
  GETD: 'traveller.room-unit.retrieved.v1',


  LIST_PRE: 'traveller.room-unit.list.pre.v1',
  LIST_PROCESS: 'traveller.room-unit.list.process.v1',
  LIST_POST: 'traveller.room-unit.list.post.v1',
  LISTD: 'traveller.room-unit.listed.v1',


  UPDATE_PRE: 'traveller.room-unit.update.pre.v1',
  UPDATE_PROCESS: 'traveller.room-unit.update.process.v1',
  UPDATE_POST: 'traveller.room-unit.update.post.v1',
  UPDATED: 'traveller.room-unit.updated.v1',


  DELETE_PRE: 'traveller.room-unit.delete.pre.v1',
  DELETE_PROCESS: 'traveller.room-unit.delete.process.v1',
  DELETE_POST: 'traveller.room-unit.delete.post.v1',
  DELETED: 'traveller.room-unit.deleted.v1',

} as const;

export type RoomUnitEventName = (typeof ROOM_UNIT_EVENTS)[keyof typeof ROOM_UNIT_EVENTS];
