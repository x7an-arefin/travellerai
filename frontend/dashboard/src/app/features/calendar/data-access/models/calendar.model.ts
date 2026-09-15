export type CalendarEventType = 'departure' | 'meeting' | 'launch' | 'demo' | 'review'

export interface CalendarAttendee {
  name: string
  avatar?: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: number // day of current month (1..31)
  time: string
  type: CalendarEventType
  attendees: CalendarAttendee[]
  location?: string
  departureId?: string
}

export interface CreateCalendarEventPayload {
  title: string
  date: number
  time: string
  type: CalendarEventType
  location?: string
  attendees?: CalendarAttendee[]
}
