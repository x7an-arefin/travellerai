export const PACKAGE_FAQ_EVENTS = {

  CREATE_PRE: 'traveller.package-faq.create.pre.v1',
  CREATE_PROCESS: 'traveller.package-faq.create.process.v1',
  CREATE_POST: 'traveller.package-faq.create.post.v1',
  CREATED: 'traveller.package-faq.created.v1',


  GET_PRE: 'traveller.package-faq.get.pre.v1',
  GET_PROCESS: 'traveller.package-faq.get.process.v1',
  GET_POST: 'traveller.package-faq.get.post.v1',
  GETD: 'traveller.package-faq.retrieved.v1',


  LIST_PRE: 'traveller.package-faq.list.pre.v1',
  LIST_PROCESS: 'traveller.package-faq.list.process.v1',
  LIST_POST: 'traveller.package-faq.list.post.v1',
  LISTD: 'traveller.package-faq.listed.v1',


  UPDATE_PRE: 'traveller.package-faq.update.pre.v1',
  UPDATE_PROCESS: 'traveller.package-faq.update.process.v1',
  UPDATE_POST: 'traveller.package-faq.update.post.v1',
  UPDATED: 'traveller.package-faq.updated.v1',


  DELETE_PRE: 'traveller.package-faq.delete.pre.v1',
  DELETE_PROCESS: 'traveller.package-faq.delete.process.v1',
  DELETE_POST: 'traveller.package-faq.delete.post.v1',
  DELETED: 'traveller.package-faq.deleted.v1',

} as const;

export type PackageFaqEventName = (typeof PACKAGE_FAQ_EVENTS)[keyof typeof PACKAGE_FAQ_EVENTS];
