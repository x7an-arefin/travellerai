import { WithdrawalRequest } from './withdrawals.model'

export type NewWithdrawalRequest = Omit<WithdrawalRequest, 'id' | 'createdAt'>
export type UpdateWithdrawalRequest = Partial<NewWithdrawalRequest>

export interface WithdrawalListResponse {
  items: WithdrawalRequest[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
