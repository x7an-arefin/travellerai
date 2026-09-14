export const VEHICLE_TRANSFER_ROUTE_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-transfer-route.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-transfer-route.create.process.v1',
  CREATE_POST: 'traveller.vehicle-transfer-route.create.post.v1',
  CREATED: 'traveller.vehicle-transfer-route.created.v1',


  GET_PRE: 'traveller.vehicle-transfer-route.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-transfer-route.get.process.v1',
  GET_POST: 'traveller.vehicle-transfer-route.get.post.v1',
  GETD: 'traveller.vehicle-transfer-route.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-transfer-route.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-transfer-route.list.process.v1',
  LIST_POST: 'traveller.vehicle-transfer-route.list.post.v1',
  LISTD: 'traveller.vehicle-transfer-route.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-transfer-route.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-transfer-route.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-transfer-route.update.post.v1',
  UPDATED: 'traveller.vehicle-transfer-route.updated.v1',


  DELETE_PRE: 'traveller.vehicle-transfer-route.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-transfer-route.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-transfer-route.delete.post.v1',
  DELETED: 'traveller.vehicle-transfer-route.deleted.v1',

} as const;

export type VehicleTransferRouteEventName = (typeof VEHICLE_TRANSFER_ROUTE_EVENTS)[keyof typeof VEHICLE_TRANSFER_ROUTE_EVENTS];
