export const ROOM_TYPE_EVENTS = {

  CREATE_PRE: 'traveller.room-type.create.pre.v1',
  CREATE_PROCESS: 'traveller.room-type.create.process.v1',
  CREATE_POST: 'traveller.room-type.create.post.v1',
  CREATED: 'traveller.room-type.created.v1',


  GET_PRE: 'traveller.room-type.get.pre.v1',
  GET_PROCESS: 'traveller.room-type.get.process.v1',
  GET_POST: 'traveller.room-type.get.post.v1',
  GETD: 'traveller.room-type.retrieved.v1',


  LIST_PRE: 'traveller.room-type.list.pre.v1',
  LIST_PROCESS: 'traveller.room-type.list.process.v1',
  LIST_POST: 'traveller.room-type.list.post.v1',
  LISTD: 'traveller.room-type.listed.v1',


  UPDATE_PRE: 'traveller.room-type.update.pre.v1',
  UPDATE_PROCESS: 'traveller.room-type.update.process.v1',
  UPDATE_POST: 'traveller.room-type.update.post.v1',
  UPDATED: 'traveller.room-type.updated.v1',


  DELETE_PRE: 'traveller.room-type.delete.pre.v1',
  DELETE_PROCESS: 'traveller.room-type.delete.process.v1',
  DELETE_POST: 'traveller.room-type.delete.post.v1',
  DELETED: 'traveller.room-type.deleted.v1',

} as const;

export type RoomTypeEventName = (typeof ROOM_TYPE_EVENTS)[keyof typeof ROOM_TYPE_EVENTS];
