import { TargetData } from "../types"

export const mockTargetData: TargetData = {
  period: "Quarterly",
  startDate: "2026-07-01T00:00:00Z",
  endDate: "2026-09-30T23:59:59Z",
  daysRemaining: 45,
  totalDays: 92,
  hierarchy: {
    id: "COMP-1",
    name: "Global Enterprise Corp",
    level: "Company",
    manager: "Elon Musk",
    metrics: {
      target: 50000000, // 50M
      achieved: 26000000, // 26M (52%)
      gap: 24000000,
      forecast: 48500000,
      requiredDailyRunRate: 533333,
      currentDailyRunRate: 553191,
      winRate: 42,
      averageDealSize: 125000
    },
    children: [
      {
        id: "REG-NA",
        name: "North America",
        level: "Region",
        manager: "Sarah Jenkins",
        metrics: {
          target: 30000000,
          achieved: 18000000, // 60%
          gap: 12000000,
          forecast: 31000000,
          requiredDailyRunRate: 266666,
          currentDailyRunRate: 382978,
          winRate: 48,
          averageDealSize: 150000
        },
        children: [
          {
            id: "BR-NYC",
            name: "New York Branch",
            level: "Branch",
            manager: "Michael Scott",
            metrics: {
              target: 15000000,
              achieved: 9500000,
              gap: 5500000,
              forecast: 16000000,
              requiredDailyRunRate: 122222,
              currentDailyRunRate: 202127,
              winRate: 51,
              averageDealSize: 200000
            }
          }
        ]
      },
      {
        id: "REG-EMEA",
        name: "EMEA",
        level: "Region",
        manager: "David Brent",
        metrics: {
          target: 20000000,
          achieved: 8000000, // 40%
          gap: 12000000,
          forecast: 17500000,
          requiredDailyRunRate: 266666,
          currentDailyRunRate: 170212,
          winRate: 35,
          averageDealSize: 95000
        }
      }
    ]
  },
  aiInsights: {
    prediction: 97, // 97% of target
    achievementForecast: 48500000,
    riskLevel: "Medium",
    riskFactors: [
      "EMEA region is tracking 12% behind expected run-rate.",
      "Two enterprise deals in Negotiation stage have been delayed by procurement."
    ],
    recommendedActions: [
      "Execute targeted Q3 discount campaign for EMEA mid-market accounts.",
      "Involve executive sponsor (VP Sales) on the top 3 stalled enterprise deals."
    ],
    dailyCoaching: "Your team needs to generate $533k daily to hit target. Focus today on pushing the 4 deals in 'Proposal' to 'Negotiation' to build pipeline momentum."
  },
  historicalAchievement: [
    { period: "Q1 2025", achieved: 42000000, target: 40000000 },
    { period: "Q2 2025", achieved: 48000000, target: 45000000 },
    { period: "Q3 2025", achieved: 46000000, target: 50000000 },
    { period: "Q4 2025", achieved: 55000000, target: 52000000 },
    { period: "Q1 2026", achieved: 49000000, target: 48000000 },
    { period: "Q2 2026", achieved: 52000000, target: 55000000 }
  ]
}
