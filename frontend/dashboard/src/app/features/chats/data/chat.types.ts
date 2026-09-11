export interface ChatMessage {
  sender: string
  message: string
  timestamp: string
}

export interface Conversation {
  id: string
  profile: string
  username: string
  fullName: string
  title: string
  messages: ChatMessage[]
}
