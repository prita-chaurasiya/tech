import { useState } from "react"
import { mockTargetData } from "../data/mockData"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, TrendingDown, TrendingUp, AlertTriangle, Lightbulb, Activity, Building2, Users, MapPin, Briefcase, Zap } from "lucide-react"
import { TargetHistoricalChart } from "../components/TargetHistoricalChart"
import { TargetHierarchyTree } from "../components/TargetHierarchyTree"

export function TargetDashboardPage() {
  const [level, setLevel] = useState("company")
  const [period, setPeriod] = useState("quarterly")
  const data = mockTargetData
  const metrics = data.hierarchy.metrics
  
  const pctAchieved = (metrics.achieved / metrics.target) * 100

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Target,Achieved,Gap\n"
      + `${metrics.target},${metrics.achieved},${metrics.gap}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "targets_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Target Management</h1>
          <p className="text-muted-foreground mt-1">Track quota attainment and performance analytics.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <Tabs value={period} onValueChange={setPeriod} className="w-full md:w-auto flex-1 md:flex-none">
            <TabsList className="h-9 w-full grid grid-cols-3 md:flex">
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs">Quarterly</TabsTrigger>
              <TabsTrigger value="annual" className="text-xs">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={handleExport}>
            Export Report
          </Button>
          <Button size="sm" className="flex-1 md:flex-none w-full md:w-auto" onClick={() => alert("Set Target logic goes here")}>
            Set Target
          </Button>
        </div>
      </div>

      <Tabs value={level} onValueChange={setLevel} className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-6">
          {[
            { id: "company", label: "Company", icon: Building2 },
            { id: "region", label: "Region", icon: MapPin },
            { id: "branch", label: "Branch", icon: Building2 },
            { id: "team", label: "Team", icon: Users },
            { id: "salesperson", label: "Salesperson", icon: Briefcase },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium flex items-center gap-2"
            >
              <tab.icon size={16} className="text-muted-foreground" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="pt-6">
          <TabsContent value="company" className="mt-0 space-y-6">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Target Achievement</span>
                    <Target size={16} className="text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{formatCurrency(metrics.achieved)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    of {formatCurrency(metrics.target)} target ({pctAchieved.toFixed(1)}%)
                  </div>
                  <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.min(pctAchieved, 100)}%` }} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Target Gap</span>
                    <TrendingDown size={16} className="text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold">{formatCurrency(metrics.gap)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.daysRemaining} days remaining in quarter
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center justify-between">
                    <span>AI Forecast</span>
                    <TrendingUp size={16} className="text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold">{formatCurrency(metrics.forecast)}</div>
                  <div className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp size={12} /> {((metrics.forecast / metrics.target) * 100).toFixed(1)}% predicted attainment
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Required Daily Run Rate</span>
                    <Activity size={16} className="text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{formatCurrency(metrics.requiredDailyRunRate)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Current actual: {formatCurrency(metrics.currentDailyRunRate)} / day
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Performance</CardTitle>
                    <CardDescription>Target vs Achievement over previous periods</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <TargetHistoricalChart data={data.historicalAchievement} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Region Breakdown</CardTitle>
                    <CardDescription>Target allocation and achievement by region</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <TargetHierarchyTree node={data.hierarchy} />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-accent/20 bg-accent/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <Zap size={18} /> AI Daily Coaching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium leading-relaxed">
                      {data.aiInsights.dailyCoaching}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <AlertTriangle size={18} /> AI Risk Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">
                      {data.aiInsights.riskLevel} Risk Detected
                    </div>
                    <ul className="space-y-3">
                      {data.aiInsights.riskFactors.map((risk, i) => (
                        <li key={i} className="flex gap-2 text-sm text-orange-600/80 dark:text-orange-400/80">
                          <span className="mt-0.5">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb size={18} className="text-primary" /> Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.aiInsights.recommendedActions.map((action, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">→</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

          </TabsContent>
          
          <TabsContent value="region">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">Region Target View Coming Soon...</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="branch">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">Branch Target View Coming Soon...</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">Team Target View Coming Soon...</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="salesperson">
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">Salesperson Target View Coming Soon...</CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
