import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Trophy, Target, TrendingUp, TrendingDown, Bot, Flame, Medal, Star, ShieldAlert } from "lucide-react"

const MOCK_LEADERBOARD = [
  { id: 1, name: "Sarah Connor", score: 98, level: "Diamond", revenue: 1250000, meetings: 42, winRate: 34, avatar: "SC", trend: "up" },
  { id: 2, name: "John Smith", score: 85, level: "Platinum", revenue: 850000, meetings: 28, winRate: 28, avatar: "JS", trend: "down" },
  { id: 3, name: "Emma Davis", score: 82, level: "Platinum", revenue: 820000, meetings: 35, winRate: 25, avatar: "ED", trend: "up" },
  { id: 4, name: "Michael Chang", score: 74, level: "Gold", revenue: 450000, meetings: 21, winRate: 18, avatar: "MC", trend: "down" },
  { id: 5, name: "Lisa Wong", score: 68, level: "Silver", revenue: 210000, meetings: 14, winRate: 12, avatar: "LW", trend: "up" },
]

export function PerformancePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Diamond": return "text-cyan-500 border-cyan-500/30 bg-cyan-500/10"
      case "Platinum": return "text-slate-300 border-slate-300/30 bg-slate-300/10"
      case "Gold": return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10"
      case "Silver": return "text-slate-400 border-slate-400/30 bg-slate-400/10"
      default: return "text-muted-foreground"
    }
  }

  const getMedal = (rank: number) => {
    switch(rank) {
      case 1: return <Medal className="text-yellow-500" size={24} />
      case 2: return <Medal className="text-slate-300" size={24} />
      case 3: return <Medal className="text-amber-600" size={24} />
      default: return <span className="font-bold text-lg text-muted-foreground w-[24px] text-center">{rank}</span>
    }
  }

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance & Coaching</h1>
        <p className="text-muted-foreground mt-1">Gamified sales performance, leaderboards, and AI coaching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-primary flex items-center gap-2"><Trophy size={16} /> My Score</div>
                  <Badge variant="outline" className={getLevelColor("Diamond")}>Diamond Level</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">98</span>
                  <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                </div>
                <Progress value={98} className="h-2 mt-4 bg-primary/20 [&>div]:bg-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Target size={16} /> Target Achievement
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">125%</span>
                  <TrendingUp size={20} className="text-emerald-500 mb-1" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+$250,000 above Q3 quota</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Flame size={16} className="text-orange-500" /> Activity Streak
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">14</span>
                  <span className="text-sm text-muted-foreground mb-1">days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Consistent daily meetings booked</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-6">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium">
                Team Leaderboard
              </TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium">
                My Achievements
              </TabsTrigger>
            </TabsList>
            
            <div className="pt-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <Card>
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="text-lg">Global Rankings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                          <tr>
                            <th className="px-6 py-4 font-medium text-center">Rank</th>
                            <th className="px-6 py-4 font-medium">Salesperson</th>
                            <th className="px-6 py-4 font-medium">Level</th>
                            <th className="px-6 py-4 font-medium text-right">Revenue</th>
                            <th className="px-6 py-4 font-medium text-center">Win Rate</th>
                            <th className="px-6 py-4 font-medium text-right">Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {MOCK_LEADERBOARD.map((user, i) => (
                            <tr key={user.id} className={`hover:bg-muted/30 transition-colors ${i === 0 ? "bg-primary/5" : ""}`}>
                              <td className="px-6 py-4 flex justify-center">{getMedal(i + 1)}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border">
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{user.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-semibold flex items-center gap-2">
                                    {user.name}
                                    {user.trend === "up" ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-500" />}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant="outline" className={getLevelColor(user.level)}>{user.level}</Badge>
                              </td>
                              <td className="px-6 py-4 font-bold text-right">{formatCurrency(user.revenue)}</td>
                              <td className="px-6 py-4 text-center">{user.winRate}%</td>
                              <td className="px-6 py-4 font-black text-right text-lg">{user.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

        </div>

        {/* Right Panel: AI Coaching */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="border-primary/20 shadow-sm relative overflow-hidden bg-card h-full">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <CardHeader className="pb-4 relative z-10 border-b bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot size={20} className="text-primary" /> AI Sales Coach
              </CardTitle>
              <CardDescription>Personalized insights based on your performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 relative z-10">
              
              <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Star size={14} className="text-emerald-500" /> Strengths
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-sm">
                  <span className="font-semibold text-emerald-600 block mb-1">Enterprise Closing</span>
                  <span className="text-emerald-600/80">Your win rate for deals &gt;$100k is 20% higher than the team average.</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert size={14} className="text-orange-500" /> Improvement Areas
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 text-sm">
                  <span className="font-semibold text-orange-600 block mb-1">Time in Stage: Proposal</span>
                  <span className="text-orange-600/80">Your deals spend an average of 14 days in Proposal stage vs team average of 8 days.</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Action</div>
                <Button className="w-full justify-start text-left h-auto py-3 bg-primary text-primary-foreground border-transparent shadow-sm hover:brightness-110 transition-all">
                  <div>
                    <div className="font-semibold text-sm">Review Proposal Templates</div>
                    <div className="text-xs opacity-80 mt-0.5">Start 15-min AI training module</div>
                  </div>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
