export interface ChatMessage {
  id?: string
  sender: string
  message: string
  timestamp: string
  isMe?: boolean
}

export interface Conversation {
  id: string
  profile: string
  username: string
  fullName: string
  title: string
  status?: 'online' | 'offline' | 'away'
  unreadCount?: number
  messages: ChatMessage[]
}

export interface SendMessageDto {
  conversationId: string
  message: string
}
