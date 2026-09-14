export const VEHICLE_EVENTS = {

  CREATE_PRE: 'traveller.vehicle.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle.create.process.v1',
  CREATE_POST: 'traveller.vehicle.create.post.v1',
  CREATED: 'traveller.vehicle.created.v1',


  GET_PRE: 'traveller.vehicle.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle.get.process.v1',
  GET_POST: 'traveller.vehicle.get.post.v1',
  GETD: 'traveller.vehicle.retrieved.v1',


  LIST_PRE: 'traveller.vehicle.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle.list.process.v1',
  LIST_POST: 'traveller.vehicle.list.post.v1',
  LISTD: 'traveller.vehicle.listed.v1',


  UPDATE_PRE: 'traveller.vehicle.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle.update.process.v1',
  UPDATE_POST: 'traveller.vehicle.update.post.v1',
  UPDATED: 'traveller.vehicle.updated.v1',


  DELETE_PRE: 'traveller.vehicle.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle.delete.process.v1',
  DELETE_POST: 'traveller.vehicle.delete.post.v1',
  DELETED: 'traveller.vehicle.deleted.v1',

} as const;

export type VehicleEventName = (typeof VEHICLE_EVENTS)[keyof typeof VEHICLE_EVENTS];
