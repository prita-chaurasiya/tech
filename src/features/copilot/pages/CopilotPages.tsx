import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, AlertTriangle, LineChart, Target, MessageSquare } from "lucide-react"

export function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-muted-foreground">Automated observations about your sales pipeline.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500" /> Latest Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            AI is analyzing your CRM data...
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function DealRiskPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Deal Risk</h2>
          <p className="text-muted-foreground">AI detection of stuck opportunities and revenue at risk.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> At-Risk Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No high-risk deals detected currently.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AISalesForecastPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Sales Forecast</h2>
          <p className="text-muted-foreground">Machine learning predictions for month-end revenue.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LineChart className="w-5 h-5" /> Predicted Target Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Gathering data points for prediction model.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function NextBestActionPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Next Best Action</h2>
          <p className="text-muted-foreground">AI recommendations on who to contact today.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Recommended Priorities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Your prioritized task list is being generated.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SalesCoachPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sales Coach</h2>
          <p className="text-muted-foreground">Behavioral analysis and performance coaching for sales reps.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Coaching Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Coach will provide recommendations after 7 days of activity.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
