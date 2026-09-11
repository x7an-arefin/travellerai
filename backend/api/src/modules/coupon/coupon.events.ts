export const COUPON_EVENTS = {

  CREATE_PRE: 'traveller.coupon.create.pre.v1',
  CREATE_PROCESS: 'traveller.coupon.create.process.v1',
  CREATE_POST: 'traveller.coupon.create.post.v1',
  CREATED: 'traveller.coupon.created.v1',


  GET_PRE: 'traveller.coupon.get.pre.v1',
  GET_PROCESS: 'traveller.coupon.get.process.v1',
  GET_POST: 'traveller.coupon.get.post.v1',
  GETD: 'traveller.coupon.retrieved.v1',


  LIST_PRE: 'traveller.coupon.list.pre.v1',
  LIST_PROCESS: 'traveller.coupon.list.process.v1',
  LIST_POST: 'traveller.coupon.list.post.v1',
  LISTD: 'traveller.coupon.listed.v1',


  UPDATE_PRE: 'traveller.coupon.update.pre.v1',
  UPDATE_PROCESS: 'traveller.coupon.update.process.v1',
  UPDATE_POST: 'traveller.coupon.update.post.v1',
  UPDATED: 'traveller.coupon.updated.v1',


  DELETE_PRE: 'traveller.coupon.delete.pre.v1',
  DELETE_PROCESS: 'traveller.coupon.delete.process.v1',
  DELETE_POST: 'traveller.coupon.delete.post.v1',
  DELETED: 'traveller.coupon.deleted.v1',

} as const;

export type CouponEventName = (typeof COUPON_EVENTS)[keyof typeof COUPON_EVENTS];
