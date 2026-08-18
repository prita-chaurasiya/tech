import { GenericDashboardTemplate } from "@/components/templates/GenericDashboardTemplate"

const metrics = [
  { title: "Total Generated", value: "124 Reports", trend: "+12%", trendUp: true },
]
const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
]

export const SalesReportsPage = () => <GenericDashboardTemplate dashboardName="Sales Reports" description="Comprehensive sales reporting." metrics={metrics} chartData={chartData} />
export const ActivityReportsPage = () => <GenericDashboardTemplate dashboardName="Activity Reports" description="Team activity reporting." metrics={metrics} chartData={chartData} />
export const KPIReportsPage = () => <GenericDashboardTemplate dashboardName="KPI Reports" description="Key performance indicator reporting." metrics={metrics} chartData={chartData} />
export const ForecastReportsPage = () => <GenericDashboardTemplate dashboardName="Forecast Reports" description="Sales forecast reporting." metrics={metrics} chartData={chartData} />
export const TerritoryReportsPage = () => <GenericDashboardTemplate dashboardName="Territory Reports" description="Territory performance reporting." metrics={metrics} chartData={chartData} />
export const CustomerReportsPage = () => <GenericDashboardTemplate dashboardName="Customer Reports" description="Customer segment reporting." metrics={metrics} chartData={chartData} />
