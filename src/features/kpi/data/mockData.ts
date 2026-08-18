import { KPIPerformanceScorecard } from "../types"

export const mockKPIData: KPIPerformanceScorecard = {
  overallScore: 84,
  previousScore: 79,
  categories: [
    { category: "Revenue", score: 92, weight: 40 },
    { category: "Pipeline", score: 85, weight: 30 },
    { category: "Activity", score: 76, weight: 20 },
    { category: "Customer", score: 88, weight: 10 },
  ],
  kpis: [
    {
      id: "KPI-1",
      name: "New Logo ACV",
      category: "Revenue",
      target: 2000000,
      actual: 1850000,
      unit: "$",
      weight: 25,
      status: "OnTrack",
      trend: "up",
      trendValue: 12,
      history: [
        { period: "Jan", value: 200000, target: 333000 },
        { period: "Feb", value: 450000, target: 333000 },
        { period: "Mar", value: 300000, target: 333000 },
        { period: "Apr", value: 350000, target: 333000 },
        { period: "May", value: 550000, target: 333000 },
      ],
      aiPrediction: 2150000,
      aiInsight: "Historical Q3 seasonality suggests target will be exceeded by 7.5%."
    },
    {
      id: "KPI-2",
      name: "Win Rate",
      category: "Pipeline",
      target: 35,
      actual: 31,
      unit: "%",
      weight: 15,
      status: "AtRisk",
      trend: "down",
      trendValue: -2.5,
      history: [
        { period: "Jan", value: 38, target: 35 },
        { period: "Feb", value: 36, target: 35 },
        { period: "Mar", value: 32, target: 35 },
        { period: "Apr", value: 31, target: 35 },
        { period: "May", value: 31, target: 35 },
      ],
      aiPrediction: 30,
      aiInsight: "Competitor 'TechNova' pricing drops have impacted win rate in the mid-market segment."
    },
    {
      id: "KPI-3",
      name: "Sales Meetings",
      category: "Activity",
      target: 150,
      actual: 120,
      unit: "#",
      weight: 15,
      status: "OffTrack",
      trend: "down",
      trendValue: -15,
      history: [
        { period: "Jan", value: 160, target: 150 },
        { period: "Feb", value: 145, target: 150 },
        { period: "Mar", value: 130, target: 150 },
        { period: "Apr", value: 110, target: 150 },
        { period: "May", value: 120, target: 150 },
      ],
      aiPrediction: 135,
      aiInsight: "Outbound call volume has dropped, leading to fewer meetings booked. Increase top-of-funnel SDR activity."
    },
    {
      id: "KPI-4",
      name: "Avg Deal Size",
      category: "Revenue",
      target: 85000,
      actual: 92000,
      unit: "$",
      weight: 15,
      status: "OnTrack",
      trend: "up",
      trendValue: 8.2,
      history: [
        { period: "Jan", value: 81000, target: 85000 },
        { period: "Feb", value: 83000, target: 85000 },
        { period: "Mar", value: 88000, target: 85000 },
        { period: "Apr", value: 91000, target: 85000 },
        { period: "May", value: 92000, target: 85000 },
      ],
      aiPrediction: 95000,
      aiInsight: "Upselling the new Analytics module is successfully driving up the average deal size."
    }
  ],
  leaderboard: [
    { id: "U-1", name: "Sarah Jenkins", department: "Enterprise Sales", overallScore: 96, rankChange: 1 },
    { id: "U-2", name: "Michael Chang", department: "Mid-Market", overallScore: 91, rankChange: -1 },
    { id: "U-3", name: "Alex Rivera", department: "Enterprise Sales", overallScore: 88, rankChange: 0 },
    { id: "U-4", name: "Jessica Alba", department: "SMB Sales", overallScore: 82, rankChange: 2 },
    { id: "U-5", name: "Tom Hardy", department: "Mid-Market", overallScore: 76, rankChange: -1 },
  ]
}
