export type TargetLevel = "Company" | "Region" | "Branch" | "Team" | "Salesperson"
export type TargetPeriod = "Monthly" | "Quarterly" | "Annual"

export interface TargetMetric {
  target: number
  achieved: number
  gap: number
  forecast: number
  requiredDailyRunRate: number
  currentDailyRunRate: number
  winRate: number // percentage
  averageDealSize: number
}

export interface TargetHierarchyNode {
  id: string
  name: string
  level: TargetLevel
  metrics: TargetMetric
  manager?: string
  avatar?: string
  children?: TargetHierarchyNode[]
}

export interface AIInsights {
  prediction: number // Predicted achievement percentage
  achievementForecast: number // Absolute dollar amount
  riskLevel: "Low" | "Medium" | "High"
  riskFactors: string[]
  recommendedActions: string[]
  dailyCoaching: string
}

export interface TargetData {
  period: TargetPeriod
  startDate: string
  endDate: string
  daysRemaining: number
  totalDays: number
  hierarchy: TargetHierarchyNode
  aiInsights: AIInsights
  historicalAchievement: { period: string; achieved: number; target: number }[]
}
