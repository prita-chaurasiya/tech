import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, AlertTriangle, CheckCircle2, MessageSquare, Target } from "lucide-react"

export function SalespersonDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight uppercase">GOOD MORNING, RAHUL</h1>
        <p className="text-muted-foreground mt-1">Here is your daily action dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Your Target</p>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">₹25L</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Achieved</p>
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-emerald-600">₹16.5L</div>
            <p className="text-xs text-muted-foreground mt-1">66% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Gap</p>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600">₹8.5L</div>
            <p className="text-xs text-muted-foreground mt-1">Remaining to close</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-primary">Required Daily Run Rate</p>
            </div>
            <div className="text-3xl font-bold text-primary">₹70.8K</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 12 days remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-indigo-500">
          <CardHeader className="bg-indigo-50/50 dark:bg-indigo-950/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
              <MessageSquare className="h-5 w-5" />
              AI MESSAGE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed font-medium italic text-muted-foreground">
              “At your current run-rate you are likely to achieve 87% of target. Focus on ABC Hospital and XYZ Ltd before generating new leads.”
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI PRIORITIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                <Flame className="h-5 w-5 text-orange-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Close ABC Hospital — ₹4.2L</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                <Flame className="h-5 w-5 text-orange-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Follow up XYZ — ₹2.1L</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">7 leads need follow-up</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">3 opportunities inactive</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">4 meetings scheduled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
