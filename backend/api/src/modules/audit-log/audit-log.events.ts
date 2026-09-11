export const AUDIT_LOG_EVENTS = {

  CREATE_PRE: 'traveller.audit-log.create.pre.v1',
  CREATE_PROCESS: 'traveller.audit-log.create.process.v1',
  CREATE_POST: 'traveller.audit-log.create.post.v1',
  CREATED: 'traveller.audit-log.created.v1',


  GET_PRE: 'traveller.audit-log.get.pre.v1',
  GET_PROCESS: 'traveller.audit-log.get.process.v1',
  GET_POST: 'traveller.audit-log.get.post.v1',
  GETD: 'traveller.audit-log.retrieved.v1',


  LIST_PRE: 'traveller.audit-log.list.pre.v1',
  LIST_PROCESS: 'traveller.audit-log.list.process.v1',
  LIST_POST: 'traveller.audit-log.list.post.v1',
  LISTD: 'traveller.audit-log.listed.v1',

} as const;

export type AuditLogEventName = (typeof AUDIT_LOG_EVENTS)[keyof typeof AUDIT_LOG_EVENTS];
