import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDataStore } from "@/store/useDataStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Building2, Calendar, FileText, Bot, DollarSign, CheckCircle2, ChevronRight } from "lucide-react"

export function OpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const opportunities = useDataStore((state) => state.opportunities)
  
  // Find the mock opportunity or fallback to the first one
  const opp = opportunities.find(o => o.id === id) || opportunities[0]

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const STAGES = ["New", "Qualified", "Discovery", "Proposal", "Negotiation", "Decision Pending", "Closed Won"]
  const currentStageIndex = STAGES.indexOf(opp.stage)

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/pipeline")}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{opp.name}</h1>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent">{opp.stage}</Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
            <span className="flex items-center gap-1.5"><Building2 size={14} /> {opp.customerName}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Expected Close: {opp.closeDate ? new Date(opp.closeDate).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">Edit Deal</Button>
          <Button>Generate Proposal</Button>
        </div>
      </div>

      {/* Stage Progress Bar */}
      <Card className="bg-card/50 backdrop-blur-sm shadow-sm border overflow-hidden">
        <CardContent className="p-0">
          <div className="flex w-full">
            {STAGES.map((stage, i) => {
              const isCompleted = i < currentStageIndex
              const isCurrent = i === currentStageIndex
              return (
                <div 
                  key={stage} 
                  className={`flex-1 flex items-center justify-center relative h-12 text-xs font-medium border-r last:border-0
                    ${isCompleted ? 'bg-primary/10 text-primary' : ''}
                    ${isCurrent ? 'bg-primary text-primary-foreground' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-muted/30 text-muted-foreground' : ''}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isCompleted && <CheckCircle2 size={14} />}
                    {stage}
                  </span>
                  {/* Arrow shape overlay */}
                  {i < STAGES.length - 1 && (
                    <div className="absolute right-[-10px] top-0 bottom-0 w-[20px] z-20 flex items-center justify-center">
                      <ChevronRight size={24} className={isCurrent ? "text-primary" : isCompleted ? "text-primary/20" : "text-muted"} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col xl:flex-row gap-6 h-full">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 space-x-6">
              {["Overview", "Timeline", "Proposals", "Competitors", "Notes"].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 font-medium"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex-1 py-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <DollarSign size={16} /> Deal Value
                      </div>
                      <div className="text-3xl font-bold">{formatCurrency(Number(opp.expectedRevenue) || 0)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Target size={16} /> Probability
                      </div>
                      <div className="text-3xl font-bold text-primary">{opp.probability}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar size={16} /> Deal Age
                      </div>
                      <div className="text-3xl font-bold">14<span className="text-lg text-muted-foreground font-normal ml-1">days</span></div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-sm">
                      <div className="font-semibold text-primary mb-1">Follow up on Pricing Proposal</div>
                      <div className="text-muted-foreground">Scheduled for tomorrow with John Doe (VP of Engineering). Ensure you address the security compliance questions raised in the last meeting.</div>
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0">
                <Card>
                  <CardContent className="p-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                    Deal Timeline (Coming Soon)
                  </CardContent>
                </Card>
              </TabsContent>

            </div>
          </Tabs>
        </div>

        {/* Right Panel: AI Deal Copilot */}
        <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0 xl:sticky xl:top-0 h-fit">
          <Card className="border-primary/20 shadow-sm relative overflow-hidden bg-card">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <CardHeader className="pb-4 relative z-10 border-b bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot size={20} className="text-primary" /> AI Deal Coach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 relative z-10">
              
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Deal Score</div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-emerald-500">{opp.aiDealScore}</span>
                  <Badge variant="outline" className="text-xs text-emerald-500 border-emerald-500/30 bg-emerald-500/10">High Probability</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk Factors</div>
                {opp.aiRiskFactor === "High" ? (
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 text-sm">
                    <span className="font-semibold text-red-600 block mb-1">Stalled Velocity</span>
                    <span className="text-red-600/80">No activity logged in 14 days. Decision maker engagement has dropped.</span>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-sm">
                    <span className="font-semibold text-emerald-600 block mb-1">Strong Momentum</span>
                    <span className="text-emerald-600/80">Frequent multi-threaded engagement across their executive team.</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Action</div>
                <Button className="w-full justify-start text-left h-auto py-3 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground border shadow-sm transition-all">
                  <div>
                    <div className="font-semibold text-sm">Send Case Study</div>
                    <div className="text-xs opacity-80 mt-0.5">Generate email with matching competitor case study</div>
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
