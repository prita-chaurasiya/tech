import { useState } from "react"
import { mockAnalyticsData } from "../data/mockData"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts"
import { useTheme } from "@/components/theme-provider"
import { Download, Filter, FileText, FileSpreadsheet, Map as MapIcon, BarChart3, TrendingUp, Grid3x3 } from "lucide-react"

export function AnalyticsCenterPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  const [activeTab, setActiveTab] = useState("overview")

  const data = mockAnalyticsData

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
    return `$${value}`
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"]

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Center</h1>
          <p className="text-muted-foreground mt-1">Enterprise business intelligence and macro-level reporting.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700 border-transparent">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button variant="outline" size="sm" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:text-red-700 border-transparent">
            <FileText className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-6">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium flex items-center gap-2">
            <BarChart3 size={16} className="text-muted-foreground" /> Overview
          </TabsTrigger>
          <TabsTrigger value="territory" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium flex items-center gap-2">
            <MapIcon size={16} className="text-muted-foreground" /> Territory Maps
          </TabsTrigger>
          <TabsTrigger value="pivot" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium flex items-center gap-2">
            <Grid3x3 size={16} className="text-muted-foreground" /> Pivot Tables
          </TabsTrigger>
        </TabsList>
        
        <div className="pt-6">
          <TabsContent value="overview" className="mt-0 space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Macro Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Pipeline Trend</CardTitle>
                  <CardDescription>6-month macro correlation</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.macroTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPipe" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#2e303a" : "#e5e4e7"} />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }} tickFormatter={formatCurrency} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: isDark ? "#16171d" : "#fff", borderColor: isDark ? "#2e303a" : "#e5e4e7", borderRadius: "8px" }}
                        formatter={(value: any, name: any) => [, name]}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <Area type="monotone" dataKey="pipeline" name="Pipeline" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPipe)" />
                      <Area type="monotone" dataKey="revenue" name="Closed Revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Product Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Revenue mix by product line</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.products} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? "#2e303a" : "#e5e4e7"} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 12 }} tickFormatter={formatCurrency} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: isDark ? "#9ca3af" : "#6b6375", fontSize: 11 }} width={100} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: isDark ? "#16171d" : "#fff", borderColor: isDark ? "#2e303a" : "#e5e4e7", borderRadius: "8px" }}
                        formatter={(value: any, name: any) => [, name]}
                        cursor={{fill: isDark ? '#2e303a' : '#f3f4f6'}}
                      />
                      <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
                        {data.products.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

          </TabsContent>
          
          <TabsContent value="territory">
            <Card>
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <MapIcon size={48} className="text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Territory Heatmaps</h3>
                <p className="text-muted-foreground max-w-md">
                  Global and regional map visualizations powered by D3.js will be rendered here, showing revenue density and pipeline heat.
                </p>
                <Button className="mt-6" variant="outline">Configure Map Data</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pivot">
            <Card>
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <Grid3x3 size={48} className="text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-bold mb-2">Advanced Pivot Tables</h3>
                <p className="text-muted-foreground max-w-md">
                  Drag-and-drop slice and dice analytics. Group by Salesperson, Industry, Product, or Lead Source dynamically.
                </p>
                <Button className="mt-6" variant="outline">Launch Data Explorer</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}
