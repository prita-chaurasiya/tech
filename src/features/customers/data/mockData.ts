import { Customer } from "../types"

export const mockCustomer: Customer = {
  id: "C-9001",
  name: "Umbrella Corporation",
  industry: "Pharmaceuticals",
  website: "www.umbrellacorp.com",
  tier: "Enterprise",
  healthScore: 82,
  healthStatus: "Good",
  arr: 1250000,
  potentialValue: 3500000,
  aiRiskFactor: "Medium",
  aiRecommendations: [
    "Schedule Q3 business review to discuss upcoming renewals.",
    "Introduce new compliance add-on module - high probability of cross-sell.",
    "Address recent support ticket spike regarding API rate limits."
  ],
  contacts: [
    {
      id: "CT-1",
      name: "Albert Wesker",
      role: "VP of Research",
      email: "a.wesker@umbrellacorp.com",
      phone: "+1 (555) 019-2834",
      isPrimary: true
    },
    {
      id: "CT-2",
      name: "William Birkin",
      role: "Chief Scientist",
      email: "w.birkin@umbrellacorp.com",
      phone: "+1 (555) 019-2835",
      isPrimary: false
    }
  ],
  addresses: [
    {
      type: "HQ",
      street: "100 Raccoon City Blvd",
      city: "Raccoon City",
      state: "CO",
      zip: "80014",
      country: "USA"
    }
  ],
  orders: [
    { id: "ORD-001", date: "2026-05-12T10:00:00Z", amount: 250000, status: "Fulfilled" },
    { id: "ORD-002", date: "2026-07-28T14:30:00Z", amount: 150000, status: "Processing" }
  ],
  revenueHistory: [
    { month: "Jan", revenue: 80000 },
    { month: "Feb", revenue: 95000 },
    { month: "Mar", revenue: 105000 },
    { month: "Apr", revenue: 105000 },
    { month: "May", revenue: 355000 }, // Spike due to ORD-001
    { month: "Jun", revenue: 110000 },
    { month: "Jul", revenue: 260000 }  // Spike due to ORD-002
  ],
  interactions: [
    {
      id: "INT-1",
      type: "Complaint",
      title: "API Rate Limits Exceeded",
      description: "Customer reported critical workflows blocked due to API rate limits.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      author: "Support Team",
      status: "Resolved"
    },
    {
      id: "INT-2",
      type: "WhatsApp",
      title: "Quick check-in",
      description: "Sent message to Albert confirming tomorrow's meeting.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      author: "Sarah Jenkins"
    },
    {
      id: "INT-3",
      type: "Meeting",
      title: "Q2 Quarterly Business Review",
      description: "Discussed expansion into European laboratories.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
      author: "Sarah Jenkins"
    }
  ]
}
