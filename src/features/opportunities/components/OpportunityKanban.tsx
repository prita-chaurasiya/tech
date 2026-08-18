import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Opportunity, OpportunityStage } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GripVertical, AlertTriangle, Building2, Calendar, Target } from "lucide-react"

const STAGES: OpportunityStage[] = ["Discovery", "Proposal", "Negotiation", "Won", "Lost"]

export function OpportunityKanban({ opportunities: initialOpps }: { opportunities: Opportunity[] }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  useEffect(() => {
    setOpportunities(initialOpps)
  }, [initialOpps])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination, draggableId } = result
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const updatedOpps = Array.from(opportunities)
    const oppIndex = updatedOpps.findIndex(o => o.id === draggableId)
    
    if (oppIndex !== -1) {
      updatedOpps[oppIndex] = {
        ...updatedOpps[oppIndex],
        stage: destination.droppableId as OpportunityStage
      }
      setOpportunities(updatedOpps)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10"
    if (score >= 70) return "text-blue-500 bg-blue-500/10"
    return "text-orange-500 bg-orange-500/10"
  }

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  return (
    <div className="h-[calc(100vh-220px)] flex gap-4 overflow-x-auto pb-4 pt-2 px-1">
      <DragDropContext onDragEnd={onDragEnd}>
        {STAGES.map((stage) => {
          const columnOpps = opportunities.filter(o => o.stage === stage)
          const totalValue = columnOpps.reduce((sum, opp) => sum + (opp.expectedRevenue || 0), 0)

          return (
            <div key={stage} className="flex-shrink-0 w-[340px] bg-muted/40 rounded-lg flex flex-col max-h-full border">
              <div className="p-3 border-b bg-card rounded-t-lg shadow-sm z-10 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">{stage}</h3>
                  <Badge variant="secondary" className="rounded-full px-2 py-0 h-5 text-xs">{columnOpps.length}</Badge>
                </div>
                <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Target size={12} /> {formatCurrency(totalValue)} Expected
                </div>
              </div>

              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 overflow-y-auto p-3 space-y-3 transition-colors ${
                      snapshot.isDraggingOver ? "bg-accent/10" : ""
                    }`}
                  >
                    {columnOpps.map((opp, index) => (
                      <Draggable key={opp.id} draggableId={opp.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`cursor-grab active:cursor-grabbing group border shadow-sm hover:shadow-md transition-all ${
                              snapshot.isDragging ? "shadow-lg rotate-2 scale-105 z-50 border-primary/50" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                                >
                                  <GripVertical size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h4 className="font-semibold text-sm leading-tight hover:text-primary hover:underline cursor-pointer">
                                      {opp.name}
                                    </h4>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                                    <Building2 size={12} className="shrink-0" />
                                    <span className="truncate">{opp.customerName}</span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="bg-muted/50 p-1.5 rounded flex flex-col items-center justify-center">
                                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Value</span>
                                      <div className="font-bold text-xs">{formatCurrency(opp.expectedRevenue || 0)}</div>
                                    </div>
                                    <div className="bg-muted/50 p-1.5 rounded flex flex-col items-center justify-center">
                                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Prob.</span>
                                      <span className="font-bold text-xs text-primary">{opp.probability}%</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${getScoreColor(opp.aiDealScore || 0)}`}>
                                        Score: {opp.aiDealScore || 0}
                                      </span>
                                      {opp.aiRiskFactor === "High" && (
                                        <AlertTriangle size={14} className="text-red-500" />
                                      )}
                                    </div>
                                    <Avatar className="h-6 w-6 border">
                                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                        {opp.owner.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}
