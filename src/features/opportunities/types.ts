export type OpportunityStage = "Discovery" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost" | "Closed Won" | "Closed Lost"

export interface Opportunity {
  id: string
  name: string // Deal name e.g. "Acme Corp - Q4 Expansion"
  customerName?: string
  customerId?: string
  expectedRevenue?: number
  probability: number // 0-100%
  weightedRevenue?: number // expectedRevenue * (probability / 100)
  stage: OpportunityStage
  competitors?: string[]
  decisionMaker?: string
  aiDealScore?: number // 0-100
  aiRiskFactor?: "Low" | "Medium" | "High"
  aiRecommendations?: string[]
  daysInStage?: number
  closeDate?: string // ISO string
  owner: string
  createdAt?: string
}
