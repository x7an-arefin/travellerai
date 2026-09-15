export interface DbTableSchema {
  name: string
  rowCount: number
  sizeMb: number
  endpoint?: string
  description?: string
}

export interface QueryResult {
  columns: string[]
  rows: Record<string, any>[]
  executionTimeMs: number
  rowCount: number
}

export interface ExecutionPlan {
  planText: string
  cost: number
  indexName: string
  planningTimeMs: number
  executionTimeMs: number
  cacheHitRatio: string
}
