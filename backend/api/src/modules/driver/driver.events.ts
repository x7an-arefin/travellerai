export const DRIVER_EVENTS = {

  CREATE_PRE: 'traveller.driver.create.pre.v1',
  CREATE_PROCESS: 'traveller.driver.create.process.v1',
  CREATE_POST: 'traveller.driver.create.post.v1',
  CREATED: 'traveller.driver.created.v1',


  GET_PRE: 'traveller.driver.get.pre.v1',
  GET_PROCESS: 'traveller.driver.get.process.v1',
  GET_POST: 'traveller.driver.get.post.v1',
  GETD: 'traveller.driver.retrieved.v1',


  LIST_PRE: 'traveller.driver.list.pre.v1',
  LIST_PROCESS: 'traveller.driver.list.process.v1',
  LIST_POST: 'traveller.driver.list.post.v1',
  LISTD: 'traveller.driver.listed.v1',


  UPDATE_PRE: 'traveller.driver.update.pre.v1',
  UPDATE_PROCESS: 'traveller.driver.update.process.v1',
  UPDATE_POST: 'traveller.driver.update.post.v1',
  UPDATED: 'traveller.driver.updated.v1',


  DELETE_PRE: 'traveller.driver.delete.pre.v1',
  DELETE_PROCESS: 'traveller.driver.delete.process.v1',
  DELETE_POST: 'traveller.driver.delete.post.v1',
  DELETED: 'traveller.driver.deleted.v1',

} as const;

export type DriverEventName = (typeof DRIVER_EVENTS)[keyof typeof DRIVER_EVENTS];
