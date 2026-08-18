import { Opportunity } from "../types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { useTheme } from "@/components/theme-provider"

export function PipelineAnalytics({ opportunities }: { opportunities: Opportunity[] }) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Calculate Funnel Data (By Stage)
  const stageMap = {
    "New": 0, "Qualified": 0, "Discovery": 0, "Proposal": 0, "Negotiation": 0, "Decision Pending": 0
  }
  
  opportunities.forEach(opp => {
    if (stageMap[opp.stage as keyof typeof stageMap] !== undefined) {
      stageMap[opp.stage as keyof typeof stageMap] += (opp.expectedRevenue || 0)
    }
  })

  const funnelData = Object.entries(stageMap).map(([name, value]) => ({ name, value }))

  // Calculate Risk Profile
  const riskMap = { "Low": 0, "Medium": 0, "High": 0 }
  opportunities.forEach(opp => {
    riskMap[opp.aiRiskFactor as keyof typeof riskMap] += 1
  })
  
  const riskData = Object.entries(riskMap).map(([name, value]) => ({ name, value }))
  const RISK_COLORS = ["#10b981", "#f59e0b", "#ef4444"] // Low, Medium, High

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Funnel</CardTitle>
          <CardDescription>Value distribution across sales stages</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? "#2e303a" : "#e5e4e7"} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }} tickFormatter={formatCurrency} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 11 }} width={100} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: isDark ? "#16171d" : "#fff", borderColor: isDark ? "#2e303a" : "#e5e4e7", borderRadius: "8px" }}
                formatter={(value: any, name: any) => [, name]}
                cursor={{fill: isDark ? '#2e303a' : '#f3f4f6'}}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Risk Profile</CardTitle>
          <CardDescription>Opportunity count by AI-detected risk level</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: isDark ? "#16171d" : "#fff", borderColor: isDark ? "#2e303a" : "#e5e4e7", borderRadius: "8px" }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
