export const VEHICLE_INSPECTION_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-inspection.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-inspection.create.process.v1',
  CREATE_POST: 'traveller.vehicle-inspection.create.post.v1',
  CREATED: 'traveller.vehicle-inspection.created.v1',


  GET_PRE: 'traveller.vehicle-inspection.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-inspection.get.process.v1',
  GET_POST: 'traveller.vehicle-inspection.get.post.v1',
  GETD: 'traveller.vehicle-inspection.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-inspection.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-inspection.list.process.v1',
  LIST_POST: 'traveller.vehicle-inspection.list.post.v1',
  LISTD: 'traveller.vehicle-inspection.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-inspection.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-inspection.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-inspection.update.post.v1',
  UPDATED: 'traveller.vehicle-inspection.updated.v1',


  DELETE_PRE: 'traveller.vehicle-inspection.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-inspection.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-inspection.delete.post.v1',
  DELETED: 'traveller.vehicle-inspection.deleted.v1',

} as const;

export type VehicleInspectionEventName = (typeof VEHICLE_INSPECTION_EVENTS)[keyof typeof VEHICLE_INSPECTION_EVENTS];
