import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

const mockData = [
  { id: "1", to: "john@acme.com", status: "Sent", date: "2024-05-10" },
]

export const WhatsAppPage = () => <GenericModuleTemplate moduleName="WhatsApp" description="Manage WhatsApp communications." columns={["To", "Status", "Date"]} mockData={mockData} />
export const EmailPage = () => <GenericModuleTemplate moduleName="Email" description="Manage email campaigns and 1-on-1s." columns={["To", "Subject", "Status", "Date"]} mockData={[]} />
export const SMSPage = () => <GenericModuleTemplate moduleName="SMS" description="Manage SMS blasts and alerts." columns={["To", "Status", "Date"]} mockData={[]} />
export const CallingPage = () => <GenericModuleTemplate moduleName="Calling" description="Dialer and call logs." columns={["To", "Duration", "Date"]} mockData={[]} />
export const CalendarPage = () => <GenericModuleTemplate moduleName="Calendar" description="Unified team calendar." columns={["Event", "Date", "Attendees"]} mockData={[]} />
