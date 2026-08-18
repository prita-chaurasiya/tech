import { GenericDashboardTemplate } from "@/components/templates/GenericDashboardTemplate"

const metrics = [{ title: "Analyzed", value: "1,204 Data points" }]
const chartData = [{ name: "Q1", value: 400 }]

export const ProductAnalyticsPage = () => <GenericDashboardTemplate dashboardName="Product Analytics" description="Analyze product performance and sales." metrics={metrics} chartData={chartData} />
export const WinLossAnalysisPage = () => <GenericDashboardTemplate dashboardName="Win/Loss Analysis" description="Analyze reasons for won and lost deals." metrics={metrics} chartData={chartData} />
export const FunnelAnalysisPage = () => <GenericDashboardTemplate dashboardName="Funnel Analysis" description="Analyze the sales funnel conversion rates." metrics={metrics} chartData={chartData} />
