import { useNavigate } from "react-router-dom"
import { Opportunity } from "../types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, ChevronRight, AlertTriangle } from "lucide-react"

export function OpportunityList({ opportunities }: { opportunities: Opportunity[] }) {
  const navigate = useNavigate()

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-200"
    if (score >= 70) return "text-blue-500 bg-blue-500/10 border-blue-200"
    return "text-orange-500 bg-orange-500/10 border-orange-200"
  }

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
    return `$${val}`
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm h-[calc(100vh-220px)] overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left relative">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-medium">Deal Name</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium text-right">Expected Value</th>
              <th className="px-6 py-4 font-medium text-right">Probability</th>
              <th className="px-6 py-4 font-medium text-center">AI Score</th>
              <th className="px-6 py-4 font-medium">Owner</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y overflow-y-auto">
            {opportunities.map((opp) => (
              <tr 
                key={opp.id} 
                className="hover:bg-muted/30 transition-colors group cursor-pointer"
                onClick={() => navigate(`/opportunities/${opp.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="font-semibold group-hover:text-primary transition-colors">{opp.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    {opp.aiRiskFactor === "High" && <AlertTriangle size={12} className="text-red-500" />}
                    {opp.aiRiskFactor} Risk
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 size={14} />
                    <span>{opp.customerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="bg-background">{opp.stage}</Badge>
                </td>
                <td className="px-6 py-4 font-bold text-right">
                  {formatCurrency(opp.expectedRevenue)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold text-primary">{opp.probability}%</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge variant="outline" className={`font-bold ${getScoreColor(opp.aiDealScore)}`}>
                    {opp.aiDealScore}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {opp.owner.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{opp.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
