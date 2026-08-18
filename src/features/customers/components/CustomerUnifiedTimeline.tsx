import { CustomerInteraction } from "../types"
import { Mail, Phone, Calendar, MessageSquare, AlertCircle, CheckSquare, Clock } from "lucide-react"

export function CustomerUnifiedTimeline({ interactions }: { interactions: CustomerInteraction[] }) {
  const getIcon = (type: CustomerInteraction["type"]) => {
    switch (type) {
      case "Email": return <Mail className="h-4 w-4 text-blue-500" />
      case "Call": return <Phone className="h-4 w-4 text-green-500" />
      case "Meeting": return <Calendar className="h-4 w-4 text-purple-500" />
      case "WhatsApp": return <MessageSquare className="h-4 w-4 text-emerald-500" />
      case "Complaint": return <AlertCircle className="h-4 w-4 text-red-500" />
      case "Task": return <CheckSquare className="h-4 w-4 text-amber-500" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Resolved": return "text-emerald-500 bg-emerald-500/10"
      case "Completed": return "text-emerald-500 bg-emerald-500/10"
      case "Open": return "text-red-500 bg-red-500/10"
      case "Pending": return "text-amber-500 bg-amber-500/10"
      default: return "text-slate-500 bg-slate-500/10"
    }
  }

  return (
    <div className="relative pl-6 border-l-2 border-muted space-y-6 mt-2 ml-4">
      {interactions.map((interaction, idx) => (
        <div key={interaction.id} className="relative">
          <div className="absolute -left-[35px] bg-background border-2 p-1.5 rounded-full flex items-center justify-center">
            {getIcon(interaction.type)}
          </div>
          <div className="bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  {interaction.title}
                  {interaction.status && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${getStatusColor(interaction.status)}`}>
                      {interaction.status}
                    </span>
                  )}
                </h4>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {interaction.type} • Logged by {interaction.author}
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(interaction.date).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {interaction.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
