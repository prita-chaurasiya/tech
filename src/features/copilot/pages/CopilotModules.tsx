import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

export const AILeadScoringPage = () => <GenericModuleTemplate moduleName="AI Lead Scoring" description="AI models for scoring leads." columns={["Lead", "AI Score", "Confidence"]} mockData={[]} />
export const AIOppScoringPage = () => <GenericModuleTemplate moduleName="AI Opportunity Scoring" description="AI models for scoring opportunities." columns={["Opportunity", "AI Score", "Confidence"]} mockData={[]} />
export const AISalesManagerPage = () => <GenericModuleTemplate moduleName="AI Sales Manager" description="AI-driven management insights." columns={["Insight", "Category", "Date"]} mockData={[]} />
export const AIDailyBriefingPage = () => <GenericModuleTemplate moduleName="AI Daily Briefing" description="Your AI-generated daily summary." columns={["Topic", "Summary"]} mockData={[]} />
export const AIContentGeneratorPage = () => <GenericModuleTemplate moduleName="AI Content Generator" description="Generate emails and sales content." columns={["Type", "Generated Content", "Date"]} mockData={[]} />
