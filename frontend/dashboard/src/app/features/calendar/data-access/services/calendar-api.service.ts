import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { CalendarEvent, CreateCalendarEventPayload } from '../models/calendar.model'

@Injectable({
  providedIn: 'root',
})
export class CalendarApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('departures')

  private fallbackEvents: CalendarEvent[] = [
    {
      id: 'e1',
      title: 'Swiss Alps Glacier Hike - Group A Departure',
      date: 6,
      time: '09:00 AM',
      type: 'departure',
      attendees: [
        { name: 'Emma Richardson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
        { name: 'Hans Gruber', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'Zurich Airport Terminal 1, Gate B',
    },
    {
      id: 'e2',
      title: 'Serengeti 4x4 Convoy Radio & Safety Briefing',
      date: 6,
      time: '02:00 PM',
      type: 'review',
      attendees: [
        { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
        { name: 'Sarah Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'Arusha Logistics Basecamp, Radio Room',
    },
    {
      id: 'e3',
      title: 'Amalfi Coast Luxury Yacht Charter Departure',
      date: 12,
      time: '10:30 AM',
      type: 'departure',
      attendees: [
        { name: 'Liam Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'Positano Marina Pier 2',
    },
    {
      id: 'e4',
      title: 'Kyoto Heritage Ryokan & Tea Ceremony Induction',
      date: 18,
      time: '03:00 PM',
      type: 'demo',
      attendees: [
        { name: 'Aaliyah Vance', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
        { name: 'Kenji Sato', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'Gion Traditional Cultural Hall',
    },
    {
      id: 'e5',
      title: 'Iceland Arctic 4x4 Defender Fleet Inspection',
      date: 24,
      time: '11:00 AM',
      type: 'meeting',
      attendees: [
        { name: 'Mateo Hernandez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
      ],
      location: 'Keflavik Depot Hangar 4',
    },
  ]

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<{ data: any[] } | any[]>(this.baseUrl).pipe(
      map((res) => {
        const departures = Array.isArray(res) ? res : res.data || []
        if (!departures || departures.length === 0) {
          return this.fallbackEvents
        }
        return this.mapDeparturesToEvents(departures)
      }),
      catchError(() => of(this.fallbackEvents))
    )
  }

  async loadEvents(): Promise<CalendarEvent[]> {
    try {
      const events = await firstValueFrom(this.getEvents())
      return events && events.length > 0 ? events : this.fallbackEvents
    } catch {
      return this.fallbackEvents
    }
  }

  async createEvent(payload: CreateCalendarEventPayload): Promise<CalendarEvent> {
    const newEvt: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: payload.title,
      date: Number(payload.date) || 1,
      time: payload.time || '10:00 AM',
      type: payload.type || 'departure',
      location: payload.location || 'Terminal Chauffeur Desk',
      attendees: payload.attendees || [
        { name: 'Operations Staff' },
      ],
    }

    try {
      await firstValueFrom(
        this.http.post(this.baseUrl, {
          departureCode: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
          startDatetime: new Date(2026, 8, payload.date, 10, 0).toISOString(),
          capacity: 20,
          meetingPoint: payload.location,
          internalNotes: payload.title,
        }).pipe(catchError(() => of(null)))
      )
    } catch {
      // fallback
    }

    this.fallbackEvents.push(newEvt)
    return newEvt
  }

  async deleteEvent(id: string): Promise<boolean> {
    this.fallbackEvents = this.fallbackEvents.filter((e) => e.id !== id)
    return true
  }

  private mapDeparturesToEvents(departures: any[]): CalendarEvent[] {
    return departures.map((d, index) => {
      const dateObj = d.startDatetime ? new Date(d.startDatetime) : new Date()
      const dayOfMonth = dateObj.getDate() || (index % 28) + 1

      return {
        id: d.id || `dep-${index + 1}`,
        title: d.departureCode ? `${d.departureCode}: ${d.internalNotes || 'Scheduled Tour Departure'}` : 'Scheduled Tour Departure',
        date: dayOfMonth,
        time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '10:00 AM',
        type: 'departure',
        location: d.meetingPoint || 'Central Tour Hub',
        attendees: [
          { name: 'Lead Guide' },
          { name: 'Guest Group' },
        ],
        departureId: d.id,
      }
    })
  }
}
