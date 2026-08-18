import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Lead, LeadStatus } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, GripVertical } from "lucide-react"
import { Link } from "react-router-dom"

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"]

export function LeadKanban({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    setLeads(initialLeads)
  }, [initialLeads])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const updatedLeads = Array.from(leads)
    const leadIndex = updatedLeads.findIndex(l => l.id === draggableId)
    
    if (leadIndex !== -1) {
      updatedLeads[leadIndex] = {
        ...updatedLeads[leadIndex],
        status: destination.droppableId as LeadStatus
      }
      setLeads(updatedLeads)
      // In a real app, this is where we'd fire an API call to update the lead status
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-red-500 bg-red-500/10"
    if (score >= 70) return "text-orange-500 bg-orange-500/10"
    return "text-blue-500 bg-blue-500/10"
  }

  return (
    <div className="h-full flex gap-4 overflow-x-auto pb-4 pt-2 px-1">
      <DragDropContext onDragEnd={onDragEnd}>
        {STATUSES.map((status) => {
          const columnLeads = leads.filter(l => l.status === status)

          return (
            <div key={status} className="flex-shrink-0 w-80 bg-muted/40 rounded-lg flex flex-col max-h-full border">
              <div className="p-3 border-b flex items-center justify-between bg-card rounded-t-lg shadow-sm z-10">
                <h3 className="font-semibold text-sm">{status}</h3>
                <Badge variant="secondary" className="rounded-full px-2 py-0 h-5 text-xs">{columnLeads.length}</Badge>
              </div>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 overflow-y-auto p-3 space-y-3 transition-colors ${
                      snapshot.isDraggingOver ? "bg-accent/10" : ""
                    }`}
                  >
                    {columnLeads.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`cursor-grab active:cursor-grabbing group border shadow-sm hover:shadow-md transition-all ${
                              snapshot.isDragging ? "shadow-lg rotate-2 scale-105 z-50 border-primary/50" : ""
                            }`}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start gap-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                                >
                                  <GripVertical size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <Link to={`/leads/${lead.id}`} className="font-semibold text-sm truncate hover:underline text-primary">
                                      {lead.name}
                                    </Link>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${getScoreColor(lead.score)}`}>
                                      {lead.score}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                                    <Building2 size={12} className="shrink-0" />
                                    <span className="truncate">{lead.company}</span>
                                  </div>

                                  <div className="flex items-center justify-between mt-3">
                                    <span className="text-xs font-medium text-muted-foreground">
                                      ${(lead.value / 1000).toFixed(0)}k
                                    </span>
                                    <Avatar className="h-5 w-5">
                                      <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                                        {lead.owner.split(" ").map(n => n[0]).join("")}
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
