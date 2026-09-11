export const LEDGER_ENTRY_EVENTS = {

  CREATE_PRE: 'traveller.ledger-entry.create.pre.v1',
  CREATE_PROCESS: 'traveller.ledger-entry.create.process.v1',
  CREATE_POST: 'traveller.ledger-entry.create.post.v1',
  CREATED: 'traveller.ledger-entry.created.v1',


  GET_PRE: 'traveller.ledger-entry.get.pre.v1',
  GET_PROCESS: 'traveller.ledger-entry.get.process.v1',
  GET_POST: 'traveller.ledger-entry.get.post.v1',
  GETD: 'traveller.ledger-entry.retrieved.v1',


  LIST_PRE: 'traveller.ledger-entry.list.pre.v1',
  LIST_PROCESS: 'traveller.ledger-entry.list.process.v1',
  LIST_POST: 'traveller.ledger-entry.list.post.v1',
  LISTD: 'traveller.ledger-entry.listed.v1',

} as const;

export type LedgerEntryEventName = (typeof LEDGER_ENTRY_EVENTS)[keyof typeof LEDGER_ENTRY_EVENTS];
