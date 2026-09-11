export const GUIDE_PROFILE_EVENTS = {

  CREATE_PRE: 'traveller.guide-profile.create.pre.v1',
  CREATE_PROCESS: 'traveller.guide-profile.create.process.v1',
  CREATE_POST: 'traveller.guide-profile.create.post.v1',
  CREATED: 'traveller.guide-profile.created.v1',


  GET_PRE: 'traveller.guide-profile.get.pre.v1',
  GET_PROCESS: 'traveller.guide-profile.get.process.v1',
  GET_POST: 'traveller.guide-profile.get.post.v1',
  GETD: 'traveller.guide-profile.retrieved.v1',


  LIST_PRE: 'traveller.guide-profile.list.pre.v1',
  LIST_PROCESS: 'traveller.guide-profile.list.process.v1',
  LIST_POST: 'traveller.guide-profile.list.post.v1',
  LISTD: 'traveller.guide-profile.listed.v1',


  UPDATE_PRE: 'traveller.guide-profile.update.pre.v1',
  UPDATE_PROCESS: 'traveller.guide-profile.update.process.v1',
  UPDATE_POST: 'traveller.guide-profile.update.post.v1',
  UPDATED: 'traveller.guide-profile.updated.v1',


  DELETE_PRE: 'traveller.guide-profile.delete.pre.v1',
  DELETE_PROCESS: 'traveller.guide-profile.delete.process.v1',
  DELETE_POST: 'traveller.guide-profile.delete.post.v1',
  DELETED: 'traveller.guide-profile.deleted.v1',

} as const;

export type GuideProfileEventName = (typeof GUIDE_PROFILE_EVENTS)[keyof typeof GUIDE_PROFILE_EVENTS];
