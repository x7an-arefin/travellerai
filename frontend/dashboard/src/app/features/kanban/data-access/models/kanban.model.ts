export type KanbanLabel = 'bug' | 'feature' | 'documentation'
export type KanbanPriority = 'low' | 'medium' | 'high' | 'critical'
export type KanbanStatus = 'backlog' | 'todo' | 'in progress' | 'done'

export interface KanbanAssignee {
  name: string
  avatar?: string
}

export interface KanbanSubtasks {
  completed: number
  total: number
}

export interface KanbanCard {
  id: string
  title: string
  label: KanbanLabel
  priority: KanbanPriority
  status: KanbanStatus
  assignee: KanbanAssignee
  subtasks: KanbanSubtasks
  dueDate?: string
  commentsCount?: number
  ticketId?: string
}

export interface CreateKanbanPayload {
  title: string
  label: KanbanLabel
  priority: KanbanPriority
  status: KanbanStatus
  assigneeName?: string
}
