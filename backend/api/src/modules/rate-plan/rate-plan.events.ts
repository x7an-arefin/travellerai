export const RATE_PLAN_EVENTS = {

  CREATE_PRE: 'traveller.rate-plan.create.pre.v1',
  CREATE_PROCESS: 'traveller.rate-plan.create.process.v1',
  CREATE_POST: 'traveller.rate-plan.create.post.v1',
  CREATED: 'traveller.rate-plan.created.v1',


  GET_PRE: 'traveller.rate-plan.get.pre.v1',
  GET_PROCESS: 'traveller.rate-plan.get.process.v1',
  GET_POST: 'traveller.rate-plan.get.post.v1',
  GETD: 'traveller.rate-plan.retrieved.v1',


  LIST_PRE: 'traveller.rate-plan.list.pre.v1',
  LIST_PROCESS: 'traveller.rate-plan.list.process.v1',
  LIST_POST: 'traveller.rate-plan.list.post.v1',
  LISTD: 'traveller.rate-plan.listed.v1',


  UPDATE_PRE: 'traveller.rate-plan.update.pre.v1',
  UPDATE_PROCESS: 'traveller.rate-plan.update.process.v1',
  UPDATE_POST: 'traveller.rate-plan.update.post.v1',
  UPDATED: 'traveller.rate-plan.updated.v1',


  DELETE_PRE: 'traveller.rate-plan.delete.pre.v1',
  DELETE_PROCESS: 'traveller.rate-plan.delete.process.v1',
  DELETE_POST: 'traveller.rate-plan.delete.post.v1',
  DELETED: 'traveller.rate-plan.deleted.v1',

} as const;

export type RatePlanEventName = (typeof RATE_PLAN_EVENTS)[keyof typeof RATE_PLAN_EVENTS];
