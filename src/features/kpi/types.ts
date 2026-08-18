export type KPICategory = "Revenue" | "Activity" | "Pipeline" | "Customer"

export type KPIStatus = "OnTrack" | "AtRisk" | "OffTrack"

export interface KPIHistoricalData {
  period: string
  value: number
  target: number
}

export interface KPI {
  id: string
  name: string
  category: KPICategory
  target: number
  actual: number
  unit: string // e.g., "$", "#", "%"
  weight: number // 0-100 (adds up to 100 for a role)
  status: KPIStatus
  trend: "up" | "down" | "flat"
  trendValue: number // e.g., 5% improvement
  history: KPIHistoricalData[]
  aiPrediction: number
  aiInsight: string
}

export interface KPILeaderboardEntry {
  id: string
  name: string
  avatar?: string
  department: string
  overallScore: number // 0-100 aggregated score
  rankChange: number // e.g., +2, -1, 0
}

export interface KPIPerformanceScorecard {
  overallScore: number
  previousScore: number
  categories: {
    category: KPICategory
    score: number
    weight: number
  }[]
  kpis: KPI[]
  leaderboard: KPILeaderboardEntry[]
}
