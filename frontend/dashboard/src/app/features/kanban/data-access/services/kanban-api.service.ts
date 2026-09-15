import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { CreateKanbanPayload, KanbanCard, KanbanStatus } from '../models/kanban.model'

@Injectable({
  providedIn: 'root',
})
export class KanbanApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('support-tickets')

  private fallbackCards: KanbanCard[] = [
    {
      id: 'TASK-1024',
      title: 'Verify UIAGM certified mountain guide licenses for Zermatt Glacier tour',
      label: 'documentation',
      priority: 'high',
      status: 'in progress',
      assignee: {
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 3, total: 4 },
      dueDate: 'Tomorrow',
      commentsCount: 5,
    },
    {
      id: 'TASK-1025',
      title: 'Emergency brake & suspension inspection on Defender 4x4 Iceland fleet',
      label: 'bug',
      priority: 'critical',
      status: 'todo',
      assignee: {
        name: 'Mateo Hernandez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 1, total: 3 },
      dueDate: 'Today',
      commentsCount: 8,
    },
    {
      id: 'TASK-1026',
      title: 'Solar battery inverter firmware upgrade at Serengeti luxury tented lodge',
      label: 'feature',
      priority: 'medium',
      status: 'todo',
      assignee: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 0, total: 2 },
      commentsCount: 2,
    },
    {
      id: 'TASK-1027',
      title: 'Secure Positano marina VIP private catamaran docking permit',
      label: 'feature',
      priority: 'medium',
      status: 'done',
      assignee: {
        name: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 2, total: 2 },
      commentsCount: 1,
    },
    {
      id: 'TASK-1028',
      title: 'Translate passenger manifests for multilingual airport chauffeur dispatches',
      label: 'documentation',
      priority: 'low',
      status: 'backlog',
      assignee: {
        name: 'Alex Carter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 0, total: 3 },
      commentsCount: 0,
    },
    {
      id: 'TASK-1029',
      title: 'Audit high-resolution aerial trail drone scans for Swiss Alps routes',
      label: 'feature',
      priority: 'low',
      status: 'done',
      assignee: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      },
      subtasks: { completed: 4, total: 4 },
      commentsCount: 3,
    },
  ]

  getCards(): Observable<KanbanCard[]> {
    return this.http.get<{ data: any[] } | any[]>(this.baseUrl).pipe(
      map((res) => {
        const rows = Array.isArray(res) ? res : res.data || []
        if (!rows || rows.length === 0) {
          return this.fallbackCards
        }
        return this.mapTicketsToCards(rows)
      }),
      catchError(() => of(this.fallbackCards))
    )
  }

  async loadCards(): Promise<KanbanCard[]> {
    try {
      const cards = await firstValueFrom(this.getCards())
      return cards && cards.length > 0 ? cards : this.fallbackCards
    } catch {
      return this.fallbackCards
    }
  }

  async updateCardStatus(cardId: string, status: KanbanStatus): Promise<boolean> {
    const card = this.fallbackCards.find((c) => c.id === cardId)
    if (card) {
      card.status = status
    }
    return true
  }

  async createCard(payload: CreateKanbanPayload): Promise<KanbanCard> {
    const newCard: KanbanCard = {
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: payload.title,
      label: payload.label,
      priority: payload.priority,
      status: payload.status,
      assignee: {
        name: payload.assigneeName || 'Ops Specialist',
      },
      subtasks: { completed: 0, total: 2 },
      dueDate: 'Next week',
      commentsCount: 0,
    }

    this.fallbackCards.unshift(newCard)
    return newCard
  }

  private mapTicketsToCards(rows: any[]): KanbanCard[] {
    return rows.map((t, idx) => {
      let status: KanbanStatus = 'todo'
      if (t.status === 'open') status = 'todo'
      else if (t.status === 'in_progress' || t.status === 'waiting_user') status = 'in progress'
      else if (t.status === 'resolved' || t.status === 'closed') status = 'done'

      return {
        id: t.ticketNumber || `TASK-${idx + 100}`,
        title: t.subject || 'Customer In-trip Inquiry',
        label: (t.category === 'billing' ? 'bug' : 'feature') as any,
        priority: (t.priority === 'urgent' ? 'critical' : t.priority || 'medium') as any,
        status,
        assignee: {
          name: t.assignedAgentId ? 'Assigned Agent' : 'Operations Desk',
        },
        subtasks: { completed: status === 'done' ? 2 : 1, total: 2 },
        ticketId: t.id,
      }
    })
  }
}
