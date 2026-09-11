export const PACKAGE_ADDON_EVENTS = {

  CREATE_PRE: 'traveller.package-addon.create.pre.v1',
  CREATE_PROCESS: 'traveller.package-addon.create.process.v1',
  CREATE_POST: 'traveller.package-addon.create.post.v1',
  CREATED: 'traveller.package-addon.created.v1',


  GET_PRE: 'traveller.package-addon.get.pre.v1',
  GET_PROCESS: 'traveller.package-addon.get.process.v1',
  GET_POST: 'traveller.package-addon.get.post.v1',
  GETD: 'traveller.package-addon.retrieved.v1',


  LIST_PRE: 'traveller.package-addon.list.pre.v1',
  LIST_PROCESS: 'traveller.package-addon.list.process.v1',
  LIST_POST: 'traveller.package-addon.list.post.v1',
  LISTD: 'traveller.package-addon.listed.v1',


  UPDATE_PRE: 'traveller.package-addon.update.pre.v1',
  UPDATE_PROCESS: 'traveller.package-addon.update.process.v1',
  UPDATE_POST: 'traveller.package-addon.update.post.v1',
  UPDATED: 'traveller.package-addon.updated.v1',


  DELETE_PRE: 'traveller.package-addon.delete.pre.v1',
  DELETE_PROCESS: 'traveller.package-addon.delete.process.v1',
  DELETE_POST: 'traveller.package-addon.delete.post.v1',
  DELETED: 'traveller.package-addon.deleted.v1',

} as const;

export type PackageAddonEventName = (typeof PACKAGE_ADDON_EVENTS)[keyof typeof PACKAGE_ADDON_EVENTS];
