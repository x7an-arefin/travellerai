export const VEHICLE_EXTRA_CHARGE_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-extra-charge.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-extra-charge.create.process.v1',
  CREATE_POST: 'traveller.vehicle-extra-charge.create.post.v1',
  CREATED: 'traveller.vehicle-extra-charge.created.v1',


  GET_PRE: 'traveller.vehicle-extra-charge.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-extra-charge.get.process.v1',
  GET_POST: 'traveller.vehicle-extra-charge.get.post.v1',
  GETD: 'traveller.vehicle-extra-charge.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-extra-charge.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-extra-charge.list.process.v1',
  LIST_POST: 'traveller.vehicle-extra-charge.list.post.v1',
  LISTD: 'traveller.vehicle-extra-charge.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-extra-charge.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-extra-charge.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-extra-charge.update.post.v1',
  UPDATED: 'traveller.vehicle-extra-charge.updated.v1',


  DELETE_PRE: 'traveller.vehicle-extra-charge.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-extra-charge.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-extra-charge.delete.post.v1',
  DELETED: 'traveller.vehicle-extra-charge.deleted.v1',

} as const;

export type VehicleExtraChargeEventName = (typeof VEHICLE_EXTRA_CHARGE_EVENTS)[keyof typeof VEHICLE_EXTRA_CHARGE_EVENTS];
