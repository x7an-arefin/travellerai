export const VEHICLE_COMPLIANCE_DOC_EVENTS = {

  CREATE_PRE: 'traveller.vehicle-compliance-doc.create.pre.v1',
  CREATE_PROCESS: 'traveller.vehicle-compliance-doc.create.process.v1',
  CREATE_POST: 'traveller.vehicle-compliance-doc.create.post.v1',
  CREATED: 'traveller.vehicle-compliance-doc.created.v1',


  GET_PRE: 'traveller.vehicle-compliance-doc.get.pre.v1',
  GET_PROCESS: 'traveller.vehicle-compliance-doc.get.process.v1',
  GET_POST: 'traveller.vehicle-compliance-doc.get.post.v1',
  GETD: 'traveller.vehicle-compliance-doc.retrieved.v1',


  LIST_PRE: 'traveller.vehicle-compliance-doc.list.pre.v1',
  LIST_PROCESS: 'traveller.vehicle-compliance-doc.list.process.v1',
  LIST_POST: 'traveller.vehicle-compliance-doc.list.post.v1',
  LISTD: 'traveller.vehicle-compliance-doc.listed.v1',


  UPDATE_PRE: 'traveller.vehicle-compliance-doc.update.pre.v1',
  UPDATE_PROCESS: 'traveller.vehicle-compliance-doc.update.process.v1',
  UPDATE_POST: 'traveller.vehicle-compliance-doc.update.post.v1',
  UPDATED: 'traveller.vehicle-compliance-doc.updated.v1',


  DELETE_PRE: 'traveller.vehicle-compliance-doc.delete.pre.v1',
  DELETE_PROCESS: 'traveller.vehicle-compliance-doc.delete.process.v1',
  DELETE_POST: 'traveller.vehicle-compliance-doc.delete.post.v1',
  DELETED: 'traveller.vehicle-compliance-doc.deleted.v1',

} as const;

export type VehicleComplianceDocEventName = (typeof VEHICLE_COMPLIANCE_DOC_EVENTS)[keyof typeof VEHICLE_COMPLIANCE_DOC_EVENTS];
