export type ExpenseCategory =
  | 'Fleet & Fuel'
  | 'Park & Permit Fees'
  | 'Equipment & Gear'
  | 'Guide & Driver Stipends'
  | 'Software & SaaS'
  | 'Hospitality & Meals'

export interface ExpenseItem {
  id: string
  employeeName: string
  category: ExpenseCategory | string
  merchant: string
  amount: number
  currency?: string
  date: string
  status: 'approved' | 'pending' | 'rejected'
  receiptUrl?: string
  notes?: string
}

export interface NewExpenseInput {
  merchant: string
  amount: number
  category: string
  employeeName?: string
  notes?: string
}
