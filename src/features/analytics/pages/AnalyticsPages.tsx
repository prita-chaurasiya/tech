import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, PieChart, Map, Users } from "lucide-react"

export function PipelineAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pipeline Analytics</h2>
          <p className="text-muted-foreground">Analyze pipeline health, ageing, and stage conversions.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LineChart className="w-5 h-5" /> Pipeline Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Pipeline charts will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ForecastAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sales Forecast</h2>
          <p className="text-muted-foreground">AI-driven revenue predictions and targets.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LineChart className="w-5 h-5" /> Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Forecast models are being trained.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ConversionAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Conversion Analytics</h2>
          <p className="text-muted-foreground">Analyze win/loss ratios and lead conversion rates.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PieChart className="w-5 h-5" /> Win/Loss Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Conversion metrics will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function TerritoryAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Territory Performance</h2>
          <p className="text-muted-foreground">Geographic breakdown of sales and pipeline.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Map className="w-5 h-5" /> Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Territory maps will load here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function CustomerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Analytics</h2>
          <p className="text-muted-foreground">Analyze customer lifetime value and churn risk.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Churn Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Customer health data will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
