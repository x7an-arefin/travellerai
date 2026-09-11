export const BLOG_POST_EVENTS = {

  CREATE_PRE: 'traveller.blog-post.create.pre.v1',
  CREATE_PROCESS: 'traveller.blog-post.create.process.v1',
  CREATE_POST: 'traveller.blog-post.create.post.v1',
  CREATED: 'traveller.blog-post.created.v1',


  GET_PRE: 'traveller.blog-post.get.pre.v1',
  GET_PROCESS: 'traveller.blog-post.get.process.v1',
  GET_POST: 'traveller.blog-post.get.post.v1',
  GETD: 'traveller.blog-post.retrieved.v1',


  LIST_PRE: 'traveller.blog-post.list.pre.v1',
  LIST_PROCESS: 'traveller.blog-post.list.process.v1',
  LIST_POST: 'traveller.blog-post.list.post.v1',
  LISTD: 'traveller.blog-post.listed.v1',


  UPDATE_PRE: 'traveller.blog-post.update.pre.v1',
  UPDATE_PROCESS: 'traveller.blog-post.update.process.v1',
  UPDATE_POST: 'traveller.blog-post.update.post.v1',
  UPDATED: 'traveller.blog-post.updated.v1',


  DELETE_PRE: 'traveller.blog-post.delete.pre.v1',
  DELETE_PROCESS: 'traveller.blog-post.delete.process.v1',
  DELETE_POST: 'traveller.blog-post.delete.post.v1',
  DELETED: 'traveller.blog-post.deleted.v1',

} as const;

export type BlogPostEventName = (typeof BLOG_POST_EVENTS)[keyof typeof BLOG_POST_EVENTS];
