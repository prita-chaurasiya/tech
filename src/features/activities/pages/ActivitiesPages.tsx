import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Phone, Calendar, MapPin, RefreshCw } from "lucide-react"

export function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">Manage your daily tasks and priorities.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckSquare className="w-5 h-5" /> Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No tasks scheduled for today.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function CallsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calls</h2>
          <p className="text-muted-foreground">Track and manage your customer calls.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5" /> Call Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No calls recorded yet.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Meetings</h2>
          <p className="text-muted-foreground">Schedule and review upcoming meetings.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No upcoming meetings.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function VisitsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Visits</h2>
          <p className="text-muted-foreground">Manage field visits and GPS check-ins.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Planned Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No visits planned for today.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function FollowupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Follow-ups</h2>
          <p className="text-muted-foreground">Track pending follow-ups for leads and opportunities.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><RefreshCw className="w-5 h-5" /> Pending Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            You are all caught up!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
