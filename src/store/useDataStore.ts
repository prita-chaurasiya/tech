import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

// Types
export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "New" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost"
  score: number
  value: number
  owner: string
  source: string
  lastContact: string
  tags: string[]
  createdAt?: string
}

export interface Opportunity {
  id: string
  name: string
  company: string
  value: number
  stage: "Discovery" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"
  probability: number
  expectedCloseDate: string
  owner: string
  priority: "High" | "Medium" | "Low"
  customerName?: string
  customerId?: string
  closeDate?: string
  expectedRevenue?: number
  weightedRevenue?: number
  aiDealScore?: number
  aiRiskFactor?: "Low" | "Medium" | "High"
  title?: string
  customer?: string
}

export interface Customer {
  id: string
  name: string
  industry: string
  arr: number
  healthScore: number
  status: "Active" | "At Risk" | "Churned"
  renewalDate: string
  owner: string
  tier: "Enterprise" | "Mid-Market" | "SMB"
  // Extended fields for 360 view
  website?: string
  healthStatus?: string
  potentialValue?: number
  aiRiskFactor?: string
  aiRecommendations?: string[]
  contacts?: any[]
  addresses?: any[]
  revenueHistory?: any[]
  interactions?: any[]
  territory?: string
}

interface DataState {
  leads: Lead[]
  opportunities: Opportunity[]
  customers: Customer[]
  
  // Actions
  addLead: (lead: Omit<Lead, "id">) => void
  updateLead: (id: string, data: Partial<Lead>) => void
  deleteLead: (id: string) => void
  
  addOpportunity: (opp: Omit<Opportunity, "id">) => void
  updateOpportunity: (id: string, data: Partial<Opportunity>) => void
  updateOpportunityStage: (id: string, newStage: Opportunity["stage"]) => void
  deleteOpportunity: (id: string) => void
  
  addCustomer: (customer: Omit<Customer, "id">) => void
  updateCustomer: (id: string, data: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
}

const initialLeads: Lead[] = [
  { id: "L-001", name: "Sarah Chen", company: "TechFlow Inc.", email: "sarah@techflow.com", phone: "+1 (555) 0123", status: "Qualified", score: 92, value: 120000, owner: "Alex Rivera", source: "Website", lastContact: "2024-03-15", tags: ["Enterprise", "Cloud"] },
  { id: "L-002", name: "Marcus Johnson", company: "Global Retail Solutions", email: "mjohnson@grs.com", phone: "+1 (555) 0124", status: "New", score: 45, value: 45000, owner: "Jane Doe", source: "Referral", lastContact: "2024-03-14", tags: ["Retail"] },
  { id: "L-003", name: "Elena Rodriguez", company: "FinServe Partners", email: "elena.r@finserve.com", phone: "+1 (555) 0125", status: "Proposal", score: 88, value: 250000, owner: "Michael Chang", source: "Conference", lastContact: "2024-03-13", tags: ["Finance", "High Priority"] },
  { id: "L-004", name: "David Kim", company: "HealthTech Innovations", email: "dkim@healthtech.io", phone: "+1 (555) 0126", status: "Negotiation", score: 76, value: 85000, owner: "Alex Rivera", source: "Outbound", lastContact: "2024-03-12", tags: ["Healthcare"] },
  { id: "L-005", name: "Rachel Green", company: "Fashion Forward", email: "rachel@fashionforward.com", phone: "+1 (555) 0127", status: "Won", score: 95, value: 150000, owner: "Jane Doe", source: "Website", lastContact: "2024-03-10", tags: ["Retail", "E-commerce"] },
]

const initialOpportunities: Opportunity[] = [
  { id: "O-001", name: "Enterprise Cloud Migration", company: "TechCorp Global", value: 450000, stage: "Negotiation", probability: 80, expectedCloseDate: "2024-04-15", owner: "Sarah Jenkins", priority: "High" },
  { id: "O-002", name: "Q3 License Renewal", company: "RetailMax", value: 120000, stage: "Proposal", probability: 60, expectedCloseDate: "2024-05-01", owner: "Mike Chen", priority: "Medium" },
  { id: "O-003", name: "Security Audit Bundle", company: "FinBank Inc", value: 285000, stage: "Discovery", probability: 25, expectedCloseDate: "2024-06-15", owner: "Emma Watson", priority: "High" },
  { id: "O-004", name: "CRM Implementation", company: "LogisticsPlus", value: 85000, stage: "Qualified", probability: 40, expectedCloseDate: "2024-04-30", owner: "David Kumar", priority: "Low" },
  { id: "O-005", name: "Managed Services Q2", company: "HealthCare Assoc", value: 320000, stage: "Closed Won", probability: 100, expectedCloseDate: "2024-03-10", owner: "Sarah Jenkins", priority: "High" },
]

import { mockCustomer } from "../features/customers/data/mockData"

const initialCustomers: Customer[] = [
  mockCustomer as unknown as Customer,
  { id: "C-002", name: "TechStart Inc", industry: "Technology", arr: 45000, healthScore: 85, status: "Active", renewalDate: "2024-08-15", owner: "Mike Chen", tier: "SMB" },
  { id: "C-003", name: "Global Finance LLC", industry: "Financial Services", arr: 850000, healthScore: 42, status: "At Risk", renewalDate: "2024-05-30", owner: "Emma Watson", tier: "Enterprise" },
  { id: "C-004", name: "Retail Solutions Hub", industry: "Retail", arr: 210000, healthScore: 78, status: "Active", renewalDate: "2024-10-15", owner: "David Kumar", tier: "Mid-Market" },
  { id: "C-005", name: "Legacy Systems", industry: "Manufacturing", arr: 120000, healthScore: 15, status: "Churned", renewalDate: "2023-12-31", owner: "Sarah Jenkins", tier: "Mid-Market" },
]

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      leads: initialLeads,
      opportunities: initialOpportunities,
      customers: initialCustomers,
      
      addLead: (lead) => set((state) => ({ leads: [...state.leads, { ...lead, id: uuidv4() }] })),
      updateLead: (id, data) => set((state) => ({
        leads: state.leads.map(l => l.id === id ? { ...l, ...data } : l)
      })),
      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter(l => l.id !== id)
      })),

      addOpportunity: (opp) => set((state) => ({ opportunities: [...state.opportunities, { ...opp, id: uuidv4() }] })),
      updateOpportunity: (id, data) => set((state) => ({
        opportunities: state.opportunities.map(o => o.id === id ? { ...o, ...data } : o)
      })),
      updateOpportunityStage: (id, newStage) => set((state) => ({
        opportunities: state.opportunities.map(o => o.id === id ? { ...o, stage: newStage } : o)
      })),
      deleteOpportunity: (id) => set((state) => ({
        opportunities: state.opportunities.filter(o => o.id !== id)
      })),

      addCustomer: (customer) => set((state) => ({ customers: [...state.customers, { ...customer, id: uuidv4() }] })),
      updateCustomer: (id, data) => set((state) => ({
        customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter(c => c.id !== id)
      })),
    }),
    {
      name: "ai-sales-os-data",
    }
  )
)
