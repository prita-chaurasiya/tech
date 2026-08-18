import { useState } from "react"
import { mockCustomer } from "../data/mockData"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, TrendingUp, AlertTriangle, Lightbulb, User, MapPin, DollarSign, ShieldAlert, Sparkles, FileText, Download, Phone, Mail, ShoppingCart, MessageSquareWarning, ArrowRight } from "lucide-react"
import { CustomerContacts } from "../components/CustomerContacts"
import { CustomerRevenueChart } from "../components/CustomerRevenueChart"
import { CustomerUnifiedTimeline } from "../components/CustomerUnifiedTimeline"
import { useDataStore } from "@/store/useDataStore"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Customer360Page() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState("overview")
  const customers = useDataStore((state) => state.customers)
  const customer = customers.find(c => c.id === id) || customers[0]

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full pb-10">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
              <Badge variant="outline" className="bg-primary/5">{customer.tier}</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><Building2 size={14} /> {customer.industry}</span>
              <span className="flex items-center gap-1.5"><Globe size={14} /> {customer.website}</span>
              <span className="flex items-center gap-1.5 text-emerald-500"><Sparkles size={14} /> High Potential</span>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={() => {
              import("sonner").then(m => m.toast.info("Feature coming soon"))
            }}><Phone className="mr-2 h-4 w-4" /> Call</Button>
            <Button variant="outline" onClick={() => {
              import("sonner").then(m => m.toast.info("Feature coming soon"))
            }}><Mail className="mr-2 h-4 w-4" /> Email</Button>
            <Button onClick={() => {
              import("sonner").then(m => m.toast.info("Feature coming soon"))
            }}><FileText className="mr-2 h-4 w-4" /> Quote</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <TabsList className="w-full justify-start border-b rounded-none h-auto flex-wrap bg-transparent p-0 gap-x-6 gap-y-2">
            {["Overview", "Timeline", "Orders", "Revenue", "Complaints", "Addresses", "Documents", "Contacts"].map(tab => (
              <TabsTrigger 
                key={tab} 
                value={tab.toLowerCase()}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 font-medium"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex-1 py-6">
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <div className="text-lg font-semibold truncate">{customer.addresses?.find(a => a.type === "HQ")?.city || "Unknown"}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors border">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-md">
                              <ShoppingCart className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">ORD-2024-00{i}</div>
                              <div className="text-xs text-muted-foreground">May 1{i}, 2024</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">${(Math.random() * 50000).toFixed(2)}</div>
                            <Badge variant="outline" className="text-[10px] mt-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Delivered</Badge>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setActiveTab('orders')}>View All Orders <ArrowRight className="w-3 h-3 ml-1" /></Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <div key={i} className="flex justify-between items-start p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors border">
                          <div className="flex gap-3">
                            <div className="p-2 bg-amber-500/10 rounded-md shrink-0">
                              <MessageSquareWarning className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm">Integration Issue with API</div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-1">Customer reported timeouts during peak hours...</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20 shrink-0">In Progress</Badge>
                        </div>
                      ))}
                      <Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => setActiveTab('complaints')}>View All Complaints <ArrowRight className="w-3 h-3 ml-1" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Journey</CardTitle>
                  <CardDescription>Comprehensive timeline of all interactions, emails, and meetings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomerUnifiedTimeline interactions={customer.interactions || []} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Detailed order history will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue History</CardTitle>
                  <CardDescription>Monthly revenue growth over the last 12 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <CustomerRevenueChart data={customer.revenueHistory || []} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complaints">
              <Card>
                <CardHeader>
                  <CardTitle>Complaints & Tickets</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12 text-muted-foreground">
                  <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Support tickets and complaints will be listed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Addresses & Locations</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Multiple billing and shipping addresses.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Documents</CardTitle>
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Upload</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["MSA_2024.pdf", "Pricing_Addendum.pdf", "Security_Questionnaire.docx"].map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                        <FileText className="h-8 w-8 text-primary/70" />
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">{doc}</p>
                          <p className="text-xs text-muted-foreground">1.2 MB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts">
              <CustomerContacts contacts={customer.contacts || []} />
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
            <div className="w-full bg-primary/20 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${customer.healthScore}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider">Potential Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">92/100</span>
            </div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-2">
              High probability for cross-selling Enterprise Add-ons.
            </p>
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
