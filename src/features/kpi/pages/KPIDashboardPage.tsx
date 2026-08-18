import { useState } from "react"
import { mockKPIData } from "../data/mockData"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Activity, ArrowDown, ArrowUp, BarChart3, Filter, Plus, Target, Trophy, Zap, AlertTriangle, Lightbulb } from "lucide-react"

export function KPIDashboardPage() {
  const [period, setPeriod] = useState("quarterly")
  const data = mockKPIData

  const getStatusColor = (status: string) => {
    switch(status) {
      case "OnTrack": return "bg-emerald-500"
      case "AtRisk": return "bg-amber-500"
      case "OffTrack": return "bg-red-500"
      default: return "bg-slate-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500"
    if (score >= 70) return "text-blue-500"
    return "text-orange-500"
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "$") {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
      return `$${value}`
    }
    if (unit === "%") return `${value}%`
    return value.toLocaleString()
  }

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">KPI Management</h1>
          <p className="text-muted-foreground mt-1">Enterprise performance tracking and intelligent goal scoring.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={period} onValueChange={setPeriod} className="w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs">Quarterly</TabsTrigger>
              <TabsTrigger value="annual" className="text-xs">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> New KPI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Main Scorecard */}
          <Card className="bg-gradient-to-br from-card to-accent/5 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-muted/30" />
                      <circle 
                        cx="64" cy="64" r="56" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        strokeDasharray={351.8} 
                        strokeDashoffset={351.8 - (351.8 * data.overallScore) / 100} 
                        className="text-primary transition-all duration-1000 ease-out" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black">{data.overallScore}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">Company Performance Score</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center text-emerald-500 font-medium">
                        <ArrowUp size={16} className="mr-1" />
                        +{data.overallScore - data.previousScore} pts
                      </span>
                      <span>vs previous period</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {data.categories.map(cat => (
                    <div key={cat.category} className="flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm border rounded-lg p-3 min-w-[90px]">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{cat.category}</span>
                      <span className={`text-xl font-bold ${getScoreColor(cat.score)}`}>{cat.score}</span>
                      <span className="text-[10px] text-muted-foreground mt-1">{cat.weight}% weight</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Key Performance Indicators</h3>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs">All KPIs</TabsTrigger>
                <TabsTrigger value="ontrack" className="text-xs">On Track</TabsTrigger>
                <TabsTrigger value="atrisk" className="text-xs text-orange-500">At Risk</TabsTrigger>
                <TabsTrigger value="offtrack" className="text-xs text-red-500">Off Track</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.kpis.map(kpi => {
              const pctAchieved = (kpi.actual / kpi.target) * 100
              
              return (
                <Card key={kpi.id} className="hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(kpi.status)}`} />
                  <CardContent className="p-5 pl-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{kpi.name}</h4>
                          <Badge variant="outline" className="text-[10px] px-1.5">{kpi.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                          {kpi.trend === "up" ? <ArrowUp size={14} className="text-emerald-500" /> : <ArrowDown size={14} className="text-red-500" />}
                          <span className={kpi.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                            {kpi.trendValue > 0 ? "+" : ""}{kpi.trendValue}%
                          </span>
                          <span>vs last period</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs font-normal">Weight: {kpi.weight}%</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Actual</div>
                        <div className="text-2xl font-bold">{formatValue(kpi.actual, kpi.unit)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Target</div>
                        <div className="text-xl font-semibold text-muted-foreground">{formatValue(kpi.target, kpi.unit)}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{pctAchieved.toFixed(1)}% Achieved</span>
                        <span className="text-muted-foreground">AI Prediction: {formatValue(kpi.aiPrediction, kpi.unit)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${getStatusColor(kpi.status)}`} 
                          style={{ width: `${Math.min(pctAchieved, 100)}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded p-2.5 flex gap-2 items-start">
                      {kpi.status === "OnTrack" ? (
                        <Lightbulb size={14} className="text-accent mt-0.5 shrink-0" />
                      ) : (
                        <AlertTriangle size={14} className="text-orange-500 mt-0.5 shrink-0" />
                      )}
                      <p className="text-xs text-muted-foreground leading-snug">
                        {kpi.aiInsight}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" /> Leaderboard
              </CardTitle>
              <CardDescription>Top performers across all KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.leaderboard.map((user, idx) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-5 text-center font-bold text-muted-foreground text-sm">
                        {idx + 1}
                      </div>
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold">{user.overallScore}</div>
                      <div className="w-4 text-center">
                        {user.rankChange > 0 ? (
                          <ArrowUp size={14} className="text-emerald-500" />
                        ) : user.rankChange < 0 ? (
                          <ArrowDown size={14} className="text-red-500" />
                        ) : (
                          <div className="w-2 h-0.5 bg-muted-foreground rounded-full mx-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-accent">
                <Zap size={18} /> Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span><strong>Activity metrics</strong> are dragging down the overall score by 8 points.</span>
                </li>
                <li className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span><strong>Sarah Jenkins</strong> is over-indexing on Revenue KPIs (+22% vs peer average).</span>
                </li>
                <li className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Win Rate in Mid-Market has dropped for 3 consecutive weeks. <strong>Intervention required.</strong></span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-xs">View Full Analysis</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
