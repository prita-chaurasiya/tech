export type CustomerHealth = "Excellent" | "Good" | "Average" | "At Risk"

export interface Contact {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
  avatar?: string
}

export interface Address {
  type: "Billing" | "Shipping" | "HQ"
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Order {
  id: string
  date: string
  amount: number
  status: "Fulfilled" | "Processing" | "Cancelled"
}

export interface RevenueData {
  month: string
  revenue: number
}

export interface CustomerInteraction {
  id: string
  type: "Email" | "Call" | "Meeting" | "WhatsApp" | "Complaint" | "Task"
  title: string
  description: string
  date: string
  author: string
  status?: "Open" | "Resolved" | "Completed" | "Pending"
}

export interface Customer {
  id: string
  name: string
  industry: string
  website: string
  tier: "Enterprise" | "Mid-Market" | "SMB"
  healthScore: number // 0-100
  healthStatus: CustomerHealth
  arr: number // Annual Recurring Revenue
  potentialValue: number
  aiRiskFactor: "Low" | "Medium" | "High"
  aiRecommendations: string[]
  contacts: Contact[]
  addresses: Address[]
  orders: Order[]
  revenueHistory: RevenueData[]
  interactions: CustomerInteraction[]
}
