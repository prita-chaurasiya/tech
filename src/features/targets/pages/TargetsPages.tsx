import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crosshair, Users, User } from "lucide-react"

export function TeamTargetPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Targets</h2>
          <p className="text-muted-foreground">Monitor aggregate targets and achievements across sales teams.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Team Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No team targets configured yet.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SalespersonTargetPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Salesperson Targets</h2>
          <p className="text-muted-foreground">Individual quotas, run-rates, and forecasting.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Individual Quotas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No individual targets assigned.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
