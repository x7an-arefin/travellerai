export const VEHICLE_PRICING_PLAN_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-pricing-plan.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-pricing-plan.create.process.v1',
  CREATE_POST: 'traveller.vehicle-pricing-plan.create.post.v1',
  CREATED: 'traveller.vehicle-pricing-plan.created.v1',


  GET_PRE: 'traveller.vehicle-pricing-plan.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-pricing-plan.get.process.v1',
  GET_POST: 'traveller.vehicle-pricing-plan.get.post.v1',
  GETD: 'traveller.vehicle-pricing-plan.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-pricing-plan.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-pricing-plan.list.process.v1',
  LIST_POST: 'traveller.vehicle-pricing-plan.list.post.v1',
  LISTD: 'traveller.vehicle-pricing-plan.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-pricing-plan.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-pricing-plan.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-pricing-plan.update.post.v1',
  UPDATED: 'traveller.vehicle-pricing-plan.updated.v1',


  DELETE_PRE: 'traveller.vehicle-pricing-plan.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-pricing-plan.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-pricing-plan.delete.post.v1',
  DELETED: 'traveller.vehicle-pricing-plan.deleted.v1',

} as const;

export type VehiclePricingPlanEventName = (typeof VEHICLE_PRICING_PLAN_EVENTS)[keyof typeof VEHICLE_PRICING_PLAN_EVENTS];
