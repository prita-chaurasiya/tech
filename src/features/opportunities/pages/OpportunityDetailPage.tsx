import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDataStore } from "@/store/useDataStore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Building2, Calendar, FileText, Bot, DollarSign, CheckCircle2, ChevronRight, Activity, Users, FileSignature, ShieldAlert, FileBarChart, Handshake } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function OpportunityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const opportunities = useDataStore((state) => state.opportunities)
  
  const opp = opportunities.find(o => o.id === id) || opportunities[0]

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const STAGES = ["New", "Qualified", "Discovery", "Proposal", "Negotiation", "Decision Pending", "Closed Won"]
  const currentStageIndex = STAGES.indexOf(opp.stage)

  const expectedRev = Number(opp.expectedRevenue) || 0;
  const weightedRev = (expectedRev * (opp.probability / 100));

  return (
    <div className="flex flex-col h-full gap-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="icon" onClick={() => navigate("/pipeline")}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{opp.name}</h1>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent">{opp.stage}</Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1 flex-wrap">
            <span className="flex items-center gap-1.5"><Building2 size={14} /> {opp.customerName}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Expected Close: {opp.closeDate ? new Date(opp.closeDate).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div className="md:ml-auto flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <Button variant="outline" onClick={() => {
              import("sonner").then(m => m.toast.info("Feature coming soon"))
            }} className="flex-1 md:flex-none">Edit Deal</Button>
          <Button onClick={() => {
              import("sonner").then(m => m.toast.info("Feature coming soon"))
            }} className="flex-1 md:flex-none">Generate Proposal</Button>
        </div>
      </div>

      {/* Stage Progress Bar */}
      <Card className="bg-card/50 backdrop-blur-sm shadow-sm border overflow-hidden hidden md:block">
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
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap px-2">
                    {isCompleted && <CheckCircle2 size={14} />}
                    {stage}
                  </span>
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
            <TabsList className="w-full justify-start border-b rounded-none h-auto flex-wrap bg-transparent p-0 gap-x-6 gap-y-2">
              {["Overview", "Timeline", "Proposal", "Negotiation", "Competitors", "Decision Maker", "Attachments", "Notes"].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex-1 py-6">
              <TabsContent value="overview" className="mt-0 space-y-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-1 md:mb-2 flex items-center gap-2">
                        <DollarSign size={16} className="hidden sm:block" /> Deal Value
                      </div>
                      <div className="text-xl md:text-3xl font-bold">{formatCurrency(expectedRev)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-1 md:mb-2 flex items-center gap-2">
                        <Target size={16} className="hidden sm:block" /> Probability
                      </div>
                      <div className="text-xl md:text-3xl font-bold text-primary">{opp.probability}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-1 md:mb-2 flex items-center gap-2">
                        <FileBarChart size={16} className="hidden sm:block" /> Weighted Rev
                      </div>
                      <div className="text-xl md:text-3xl font-bold text-emerald-500">{formatCurrency(weightedRev)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="text-sm font-medium text-muted-foreground mb-1 md:mb-2 flex items-center gap-2">
                        <Calendar size={16} className="hidden sm:block" /> Days in Stage
                      </div>
                      <div className="text-xl md:text-3xl font-bold">14<span className="text-sm md:text-lg text-muted-foreground font-normal ml-1">days</span></div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Decision Maker</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">John Doe</div>
                          <div className="text-sm text-muted-foreground">VP of Engineering</div>
                        </div>
                        <Badge variant="outline" className="ml-auto text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Champion</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </TabsContent>
              
              <TabsContent value="timeline" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity size={18} /> Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p>Timeline of emails, calls, meetings and stage changes.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proposal" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileSignature size={18} /> Proposal Generation</CardTitle>
                  </CardHeader>
                  <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p>Generate, send, and track CPQ proposals.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="negotiation" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Handshake size={18} /> Negotiation History</CardTitle>
                  </CardHeader>
                  <CardContent className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <p>Track discount requests, margin approvals, and counter-offers.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competitors" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldAlert size={18} /> Competitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-lg flex justify-between items-center bg-card">
                      <div>
                        <div className="font-semibold text-lg">Salesforce</div>
                        <div className="text-sm text-muted-foreground">Identified as main competitor in Discovery.</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-1">High Threat</Badge>
                        <div className="text-xs text-muted-foreground">Win Rate vs Salesforce: 68%</div>
                      </div>
                    </div>
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
