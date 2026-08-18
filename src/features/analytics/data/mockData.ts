import { AnalyticsState } from "../types"

export const mockAnalyticsData: AnalyticsState = {
  macroTrends: [
    { date: "Jan", revenue: 4000000, pipeline: 12000000, activities: 1200 },
    { date: "Feb", revenue: 4500000, pipeline: 13500000, activities: 1400 },
    { date: "Mar", revenue: 4200000, pipeline: 11000000, activities: 1350 },
    { date: "Apr", revenue: 5100000, pipeline: 14000000, activities: 1600 },
    { date: "May", revenue: 4800000, pipeline: 15500000, activities: 1550 },
    { date: "Jun", revenue: 5500000, pipeline: 18000000, activities: 1800 },
  ],
  territories: [
    { region: "North America", value: 12000000, growth: 12.5 },
    { region: "EMEA", value: 8500000, growth: 4.2 },
    { region: "APAC", value: 5200000, growth: 18.7 },
    { region: "LATAM", value: 2400000, growth: 8.4 },
  ],
  products: [
    { name: "Enterprise Suite", revenue: 15000000, units: 150, margin: 82 },
    { name: "Analytics Add-on", revenue: 4500000, units: 320, margin: 91 },
    { name: "Copilot AI", revenue: 6200000, units: 410, margin: 88 },
    { name: "Implementation Services", revenue: 2400000, units: 95, margin: 45 },
  ]
}
