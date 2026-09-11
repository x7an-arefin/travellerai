export const KYC_DOCUMENT_EVENTS = {

  CREATE_PRE: 'traveller.kyc-document.create.pre.v1',
  CREATE_PROCESS: 'traveller.kyc-document.create.process.v1',
  CREATE_POST: 'traveller.kyc-document.create.post.v1',
  CREATED: 'traveller.kyc-document.created.v1',


  GET_PRE: 'traveller.kyc-document.get.pre.v1',
  GET_PROCESS: 'traveller.kyc-document.get.process.v1',
  GET_POST: 'traveller.kyc-document.get.post.v1',
  GETD: 'traveller.kyc-document.retrieved.v1',


  LIST_PRE: 'traveller.kyc-document.list.pre.v1',
  LIST_PROCESS: 'traveller.kyc-document.list.process.v1',
  LIST_POST: 'traveller.kyc-document.list.post.v1',
  LISTD: 'traveller.kyc-document.listed.v1',


  UPDATE_PRE: 'traveller.kyc-document.update.pre.v1',
  UPDATE_PROCESS: 'traveller.kyc-document.update.process.v1',
  UPDATE_POST: 'traveller.kyc-document.update.post.v1',
  UPDATED: 'traveller.kyc-document.updated.v1',


  DELETE_PRE: 'traveller.kyc-document.delete.pre.v1',
  DELETE_PROCESS: 'traveller.kyc-document.delete.process.v1',
  DELETE_POST: 'traveller.kyc-document.delete.post.v1',
  DELETED: 'traveller.kyc-document.deleted.v1',

} as const;

export type KycDocumentEventName = (typeof KYC_DOCUMENT_EVENTS)[keyof typeof KYC_DOCUMENT_EVENTS];
