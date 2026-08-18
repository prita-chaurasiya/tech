import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

export const BillingPage = () => <GenericModuleTemplate moduleName="Billing" description="Manage your billing and invoices." columns={["Invoice ID", "Date", "Amount", "Status"]} mockData={[]} />
export const APIKeysPage = () => <GenericModuleTemplate moduleName="API Keys" description="Manage your developer API keys." columns={["Key Name", "Created", "Last Used", "Status"]} mockData={[]} />
