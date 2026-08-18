import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

const mockData = [
  { id: "1", representative: "John Doe", customer: "Acme Corp", date: "2024-05-10", status: "Planned" },
  { id: "2", representative: "Jane Smith", customer: "TechFlow", date: "2024-05-11", status: "Completed" },
]

export const VisitPlanningPage = () => <GenericModuleTemplate moduleName="Visit Planning" description="Schedule and manage field visits." columns={["Representative", "Customer", "Date", "Status"]} mockData={mockData} />
export const GPSCheckInPage = () => <GenericModuleTemplate moduleName="GPS Check-in" description="Track field sales location at start of visit." columns={["Representative", "Customer", "Time", "Location"]} mockData={[]} />
export const GPSCheckOutPage = () => <GenericModuleTemplate moduleName="GPS Check-out" description="Track field sales location at end of visit." columns={["Representative", "Customer", "Time", "Location"]} mockData={[]} />
export const ExpenseTrackingPage = () => <GenericModuleTemplate moduleName="Expense Tracking" description="Manage travel and visit expenses." columns={["Representative", "Category", "Amount", "Status"]} mockData={[]} />
export const PhotosPage = () => <GenericModuleTemplate moduleName="Photos" description="Store photos from field visits." columns={["Representative", "Customer", "Date", "Photo URL"]} mockData={[]} />
export const VoiceNotesPage = () => <GenericModuleTemplate moduleName="Voice Notes" description="Store voice notes from field visits." columns={["Representative", "Customer", "Date", "Audio URL"]} mockData={[]} />
