import { CopilotSession } from "../types"

export const mockCopilotSession: CopilotSession = {
  id: "SESSION-1",
  title: "Q3 Risk Analysis",
  updatedAt: new Date().toISOString(),
  messages: [
    {
      id: "M1",
      role: "user",
      content: "Which deals are at risk of slipping this month?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "M2",
      role: "assistant",
      content: "I've analyzed your pipeline. There are currently **2 enterprise deals** showing high risk factors based on stalled momentum and lack of executive engagement.",
      timestamp: new Date(Date.now() - 3590000).toISOString(),
      contextData: [
        {
          type: "Deal",
          id: "OPP-992",
          name: "Acme Corp - Enterprise Expansion",
          summary: "Stalled in Negotiation. No activity in 14 days.",
          url: "/pipeline"
        },
        {
          type: "Deal",
          id: "OPP-145",
          name: "Globex - Security Add-on",
          summary: "Decision maker left company.",
          url: "/pipeline"
        }
      ],
      suggestedActions: ["Draft Follow-up Email", "Flag to VP of Sales"]
    }
  ]
}

export const SUGGESTED_PROMPTS = [
  "Which customers should I call today?",
  "Which opportunities are most likely to close this month?",
  "Why am I behind my target?",
  "Which leads have not been followed up?",
  "Create a follow-up message for this customer.",
  "Show opportunities above ₹5 lakh with no activity for 7 days."
]

export const QUICK_ACTIONS = [
  { label: "Generate Email", icon: "Mail" },
  { label: "Generate WhatsApp", icon: "MessageSquare" },
  { label: "Generate Proposal", icon: "FileText" },
  { label: "Meeting Summary", icon: "Video" }
]
