import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

export const KPIEnginePage = () => <GenericModuleTemplate moduleName="KPI Engine" description="Configure KPI calculation formulas." columns={["KPI Name", "Formula", "Status"]} mockData={[]} />
export const KPIScorePage = () => <GenericModuleTemplate moduleName="KPI Score" description="View individual and team KPI scores." columns={["Entity", "Score", "Date"]} mockData={[]} />
export const KPITrendsPage = () => <GenericModuleTemplate moduleName="KPI Trends" description="Analyze KPI performance over time." columns={["KPI Name", "Trend", "Period"]} mockData={[]} />
