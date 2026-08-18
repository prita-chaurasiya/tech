import { TargetData } from "../types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { useTheme } from "@/components/theme-provider"

export function TargetHistoricalChart({ data }: { data: TargetData["historicalAchievement"] }) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  
  const targetColor = isDark ? "#4b5563" : "#e5e7eb" // Muted gray
  const achievedColor = isDark ? "#10b981" : "#10b981" // Emerald

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#2e303a" : "#e5e4e7"} />
        <XAxis 
          dataKey="period" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }}
          tickFormatter={formatCurrency}
          dx={-10}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? "#16171d" : "#fff",
            borderColor: isDark ? "#2e303a" : "#e5e4e7",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          }}
          itemStyle={{ fontWeight: "bold" }}
          formatter={(value: any, name: any) => [, name]}
        />
        <Legend wrapperStyle={{ paddingTop: "20px" }} />
        <Bar dataKey="target" name="Quota" fill={targetColor} radius={[4, 4, 0, 0]} />
        <Bar dataKey="achieved" name="Achieved" fill={achievedColor} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
