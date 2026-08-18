import { TargetHierarchyNode } from "../types"
import { Badge } from "@/components/ui/badge"

export function TargetHierarchyTree({ node }: { node: TargetHierarchyNode }) {
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  const pctAchieved = (node.metrics.achieved / node.metrics.target) * 100

  return (
    <div className="w-full h-full overflow-y-auto pr-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{node.name}</h4>
            <Badge variant="outline" className="text-[10px]">{node.level}</Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{node.manager}</span>
            <span className="font-medium text-foreground">
              {formatCurrency(node.metrics.achieved)} / {formatCurrency(node.metrics.target)}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${Math.min(pctAchieved, 100)}%` }} 
            />
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="pl-6 border-l-2 border-muted space-y-4 relative">
            {node.children.map(child => (
              <div key={child.id} className="relative">
                <div className="absolute -left-6 top-6 w-6 border-t-2 border-muted" />
                <TargetHierarchyTree node={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
