import { Lead } from "../types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, Mail, Phone, Calendar, MoreVertical, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function LeadGrid({ leads }: { leads: Lead[] }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-red-500 bg-red-500/10 border-red-500/20"
    if (score >= 70) return "text-orange-500 bg-orange-500/10 border-orange-500/20"
    return "text-blue-500 bg-blue-500/10 border-blue-500/20"
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Qualified": return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "Proposal": return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "Negotiation": return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "Won": return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "Lost": return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
      default: return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {leads.map((lead) => (
        <Link key={lead.id} to={`/leads/${lead.id}`} className="block h-full">
          <Card className="group hover:shadow-md transition-all duration-300 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
            <div className="flex flex-col gap-1">
              <Badge variant="secondary" className={`w-fit font-normal ${getStatusColor(lead.status)}`}>
                {lead.status}
              </Badge>
              <CardTitle className="text-lg font-bold mt-2">{lead.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs">
                <Building2 size={12} />
                {lead.company}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={16} />
            </Button>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={14} className="shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={14} className="shrink-0" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-xs">Value:</span>
                  <span className="font-medium">${lead.value.toLocaleString()}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${getScoreColor(lead.score)}`}>
                  <Flame size={12} className={lead.score >= 90 ? "fill-current" : ""} />
                  {lead.score}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 border-t mt-4 pb-3 px-6 bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2 mt-3">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {lead.owner.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">{lead.owner}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-muted-foreground text-xs" title="Last Contacted">
              <Calendar size={12} />
              <span>{new Date(lead.lastContact).toLocaleDateString()}</span>
            </div>
          </CardFooter>
        </Card>
        </Link>
      ))}
    </div>
  )
}
