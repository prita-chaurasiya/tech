export type MessageRole = "user" | "assistant"

export interface ActionContext {
  type: "Deal" | "Customer" | "Lead" | "KPI"
  id: string
  name: string
  summary: string
  url: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  suggestedActions?: string[] // e.g., ["Generate Email", "Update CRM"]
  contextData?: ActionContext[]
}

export interface CopilotSession {
  id: string
  title: string
  messages: ChatMessage[]
  updatedAt: string
}
