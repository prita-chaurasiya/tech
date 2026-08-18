import { RevenueData } from "../types"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { useTheme } from "@/components/theme-provider"

export function CustomerRevenueChart({ data }: { data: RevenueData[] }) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  
  const color = isDark ? "#c084fc" : "#aa3bff" // Using accent colors

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#2e303a" : "#e5e4e7"} />
        <XAxis 
          dataKey="month" 
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
          itemStyle={{ color: isDark ? "#f3f4f6" : "#08060d", fontWeight: "bold" }}
          formatter={(value: any, name: any) => [, name]}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke={color} 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
          activeDot={{ r: 6, strokeWidth: 0, fill: color }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
