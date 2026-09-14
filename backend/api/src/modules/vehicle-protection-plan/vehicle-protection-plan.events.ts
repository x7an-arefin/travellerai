export const VEHICLE_PROTECTION_PLAN_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-protection-plan.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-protection-plan.create.process.v1',
  CREATE_POST: 'traveller.vehicle-protection-plan.create.post.v1',
  CREATED: 'traveller.vehicle-protection-plan.created.v1',


  GET_PRE: 'traveller.vehicle-protection-plan.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-protection-plan.get.process.v1',
  GET_POST: 'traveller.vehicle-protection-plan.get.post.v1',
  GETD: 'traveller.vehicle-protection-plan.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-protection-plan.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-protection-plan.list.process.v1',
  LIST_POST: 'traveller.vehicle-protection-plan.list.post.v1',
  LISTD: 'traveller.vehicle-protection-plan.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-protection-plan.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-protection-plan.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-protection-plan.update.post.v1',
  UPDATED: 'traveller.vehicle-protection-plan.updated.v1',


  DELETE_PRE: 'traveller.vehicle-protection-plan.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-protection-plan.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-protection-plan.delete.post.v1',
  DELETED: 'traveller.vehicle-protection-plan.deleted.v1',

} as const;

export type VehicleProtectionPlanEventName = (typeof VEHICLE_PROTECTION_PLAN_EVENTS)[keyof typeof VEHICLE_PROTECTION_PLAN_EVENTS];
