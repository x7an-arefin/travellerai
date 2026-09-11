export const PROVIDER_STAFF_EVENTS = {

  CREATE_PRE: 'traveller.provider-staff.create.pre.v1',
  CREATE_PROCESS: 'traveller.provider-staff.create.process.v1',
  CREATE_POST: 'traveller.provider-staff.create.post.v1',
  CREATED: 'traveller.provider-staff.created.v1',


  GET_PRE: 'traveller.provider-staff.get.pre.v1',
  GET_PROCESS: 'traveller.provider-staff.get.process.v1',
  GET_POST: 'traveller.provider-staff.get.post.v1',
  GETD: 'traveller.provider-staff.retrieved.v1',


  LIST_PRE: 'traveller.provider-staff.list.pre.v1',
  LIST_PROCESS: 'traveller.provider-staff.list.process.v1',
  LIST_POST: 'traveller.provider-staff.list.post.v1',
  LISTD: 'traveller.provider-staff.listed.v1',


  UPDATE_PRE: 'traveller.provider-staff.update.pre.v1',
  UPDATE_PROCESS: 'traveller.provider-staff.update.process.v1',
  UPDATE_POST: 'traveller.provider-staff.update.post.v1',
  UPDATED: 'traveller.provider-staff.updated.v1',


  DELETE_PRE: 'traveller.provider-staff.delete.pre.v1',
  DELETE_PROCESS: 'traveller.provider-staff.delete.process.v1',
  DELETE_POST: 'traveller.provider-staff.delete.post.v1',
  DELETED: 'traveller.provider-staff.deleted.v1',

} as const;

export type ProviderStaffEventName = (typeof PROVIDER_STAFF_EVENTS)[keyof typeof PROVIDER_STAFF_EVENTS];
