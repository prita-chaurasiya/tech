import { LeadActivity } from "../types"
import { Mail, Phone, Calendar, FileText, Activity, User } from "lucide-react"

export function LeadTimeline({ activities }: { activities: LeadActivity[] }) {
  const getIcon = (type: LeadActivity["type"]) => {
    switch (type) {
      case "Email": return <Mail className="h-4 w-4 text-blue-500" />
      case "Call": return <Phone className="h-4 w-4 text-green-500" />
      case "Meeting": return <Calendar className="h-4 w-4 text-purple-500" />
      case "Note": return <FileText className="h-4 w-4 text-amber-500" />
      case "StatusChange": return <Activity className="h-4 w-4 text-slate-500" />
      default: return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="relative pl-6 border-l-2 border-muted space-y-6">
      {activities.map((activity, idx) => (
        <div key={activity.id} className="relative">
          <div className="absolute -left-[35px] bg-background border-2 p-1.5 rounded-full flex items-center justify-center">
            {getIcon(activity.type)}
          </div>
          <div className="bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{activity.type}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(activity.timestamp).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {activity.content}
            </p>
            <div className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
              <div className="h-4 w-4 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-[8px]">
                {activity.author.charAt(0)}
              </div>
              Logged by {activity.author}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
