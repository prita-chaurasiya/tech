export interface AnalyticsDataPoint {
  date: string
  revenue: number
  pipeline: number
  activities: number
}

export interface TerritoryData {
  region: string
  value: number
  growth: number
}

export interface ProductPerformance {
  name: string
  revenue: number
  units: number
  margin: number
}

export interface AnalyticsState {
  macroTrends: AnalyticsDataPoint[]
  territories: TerritoryData[]
  products: ProductPerformance[]
}
