export const CMS_PAGE_EVENTS = {

  CREATE_PRE: 'traveller.cms-page.create.pre.v1',
  CREATE_PROCESS: 'traveller.cms-page.create.process.v1',
  CREATE_POST: 'traveller.cms-page.create.post.v1',
  CREATED: 'traveller.cms-page.created.v1',


  GET_PRE: 'traveller.cms-page.get.pre.v1',
  GET_PROCESS: 'traveller.cms-page.get.process.v1',
  GET_POST: 'traveller.cms-page.get.post.v1',
  GETD: 'traveller.cms-page.retrieved.v1',


  LIST_PRE: 'traveller.cms-page.list.pre.v1',
  LIST_PROCESS: 'traveller.cms-page.list.process.v1',
  LIST_POST: 'traveller.cms-page.list.post.v1',
  LISTD: 'traveller.cms-page.listed.v1',


  UPDATE_PRE: 'traveller.cms-page.update.pre.v1',
  UPDATE_PROCESS: 'traveller.cms-page.update.process.v1',
  UPDATE_POST: 'traveller.cms-page.update.post.v1',
  UPDATED: 'traveller.cms-page.updated.v1',


  DELETE_PRE: 'traveller.cms-page.delete.pre.v1',
  DELETE_PROCESS: 'traveller.cms-page.delete.process.v1',
  DELETE_POST: 'traveller.cms-page.delete.post.v1',
  DELETED: 'traveller.cms-page.deleted.v1',

} as const;

export type CmsPageEventName = (typeof CMS_PAGE_EVENTS)[keyof typeof CMS_PAGE_EVENTS];
