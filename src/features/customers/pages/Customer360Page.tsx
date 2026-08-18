import { useState } from "react"
import { mockCustomer } from "../data/mockData"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, TrendingUp, AlertTriangle, Lightbulb, User, MapPin, DollarSign, ShieldAlert, Sparkles } from "lucide-react"
import { CustomerContacts } from "../components/CustomerContacts"
import { CustomerRevenueChart } from "../components/CustomerRevenueChart"
import { CustomerUnifiedTimeline } from "../components/CustomerUnifiedTimeline"
import { useDataStore } from "@/store/useDataStore"
import { useParams } from "react-router-dom"

export function Customer360Page() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState("overview")
  const customers = useDataStore((state) => state.customers)
  const customer = customers.find(c => c.id === id) || customers[0]

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
              <Badge variant="outline" className="bg-primary/5">{customer.tier}</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1.5"><Building2 size={14} /> {customer.industry}</span>
              <span className="flex items-center gap-1.5"><Globe size={14} /> {customer.website}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 space-x-6">
            {["Overview", "Contacts", "Revenue", "Orders", "Timeline", "Files", "Complaints"].map(tab => (
              <TabsTrigger 
                key={tab} 
                value={tab.toLowerCase()}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 font-medium"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex-1 overflow-auto py-6">
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <DollarSign size={16} /> ARR
                    </div>
                    <div className="text-2xl font-bold">${(customer.arr / 1000000).toFixed(2)}M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <TrendingUp size={16} /> Potential
                    </div>
                    <div className="text-2xl font-bold">${((customer.potentialValue || 0) / 1000000).toFixed(2)}M</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <User size={16} /> Primary Contact
                    </div>
                    <div className="text-lg font-semibold truncate">{customer.contacts?.find(c => c.isPrimary)?.name}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin size={16} /> HQ
                    </div>
                    <div className="text-lg font-semibold truncate">{customer.addresses?.find(a => a.type === "HQ")?.city}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue growth over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <CustomerRevenueChart data={customer.revenueHistory || []} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts">
              <CustomerContacts contacts={customer.contacts || []} />
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Unified Customer Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerUnifiedTimeline interactions={customer.interactions || []} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Sticky Right Side Panel */}
      <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0 xl:sticky xl:top-0 h-fit">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-primary">{customer.healthScore}</span>
              <span className="text-xl font-medium text-primary/80 mb-1">{customer.healthStatus}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertTriangle size={18} /> AI Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
              {customer.aiRiskFactor} Risk
            </div>
            <p className="text-sm text-orange-600/80 dark:text-orange-400/80">
              Customer has raised critical support tickets recently. Engagement with key stakeholders has decreased by 15%.
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-accent">
              <Lightbulb size={18} /> AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {customer.aiRecommendations?.map((rec, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
