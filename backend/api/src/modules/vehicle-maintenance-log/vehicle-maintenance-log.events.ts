export const VEHICLE_MAINTENANCE_LOG_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-maintenance-log.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-maintenance-log.create.process.v1',
  CREATE_POST: 'traveller.vehicle-maintenance-log.create.post.v1',
  CREATED: 'traveller.vehicle-maintenance-log.created.v1',


  GET_PRE: 'traveller.vehicle-maintenance-log.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-maintenance-log.get.process.v1',
  GET_POST: 'traveller.vehicle-maintenance-log.get.post.v1',
  GETD: 'traveller.vehicle-maintenance-log.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-maintenance-log.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-maintenance-log.list.process.v1',
  LIST_POST: 'traveller.vehicle-maintenance-log.list.post.v1',
  LISTD: 'traveller.vehicle-maintenance-log.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-maintenance-log.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-maintenance-log.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-maintenance-log.update.post.v1',
  UPDATED: 'traveller.vehicle-maintenance-log.updated.v1',


  DELETE_PRE: 'traveller.vehicle-maintenance-log.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-maintenance-log.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-maintenance-log.delete.post.v1',
  DELETED: 'traveller.vehicle-maintenance-log.deleted.v1',

} as const;

export type VehicleMaintenanceLogEventName = (typeof VEHICLE_MAINTENANCE_LOG_EVENTS)[keyof typeof VEHICLE_MAINTENANCE_LOG_EVENTS];
