import { GenericModuleTemplate } from "@/components/templates/GenericModuleTemplate"

export const RegionTargetPage = () => <GenericModuleTemplate moduleName="Region Target" description="Manage sales targets for different regions." columns={["Region", "Target Amount", "Status"]} mockData={[]} />
export const BranchTargetPage = () => <GenericModuleTemplate moduleName="Branch Target" description="Manage sales targets for specific branches." columns={["Branch", "Region", "Target Amount"]} mockData={[]} />
export const TargetAllocationPage = () => <GenericModuleTemplate moduleName="Target Allocation" description="Allocate targets down the hierarchy." columns={["Entity", "Allocated By", "Date"]} mockData={[]} />
export const TargetHierarchyPage = () => <GenericModuleTemplate moduleName="Target Hierarchy" description="View and manage the target hierarchy." columns={["Level", "Parent", "Total Target"]} mockData={[]} />
