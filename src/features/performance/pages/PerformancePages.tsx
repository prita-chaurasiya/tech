import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Briefcase } from "lucide-react"

export function SalespersonScorePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Salesperson Score</h2>
          <p className="text-muted-foreground">Detailed breakdown of individual performance metrics.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Performance Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No score data available.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function TeamPerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Performance</h2>
          <p className="text-muted-foreground">Compare and analyze team-level metrics.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Team Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No team data available.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function IncentivesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Incentives</h2>
          <p className="text-muted-foreground">Track commissions, bonuses, and active incentive programs.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> Commission Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No active incentives calculated.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
