export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost"
export type LeadSource = "Website" | "Referral" | "Cold Call" | "LinkedIn" | "Conference"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: LeadStatus
  source: LeadSource
  owner: string
  value: number
  score: number // AI Lead Score 0-100
  lastContact: string // ISO Date string
  createdAt: string // ISO Date string
  tags: string[]
}

export interface LeadActivity {
  id: string
  leadId: string
  type: "Email" | "Call" | "Meeting" | "Note" | "StatusChange"
  content: string
  timestamp: string // ISO Date string
  author: string
}
