import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, CheckCircle2, Download, Zap, Users, HardDrive } from "lucide-react"

export function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")

  const INVOICES = [
    { id: "INV-2026-004", date: "Aug 01, 2026", amount: 2400, status: "Paid", url: "#" },
    { id: "INV-2026-003", date: "Jul 01, 2026", amount: 2400, status: "Paid", url: "#" },
    { id: "INV-2026-002", date: "Jun 01, 2026", amount: 2400, status: "Paid", url: "#" },
    { id: "INV-2026-001", date: "May 01, 2026", amount: 2400, status: "Paid", url: "#" },
  ]

  return (
    <div className="flex flex-col h-full gap-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan, payments, and system usage limits.</p>
      </div>

      {/* Current Plan Overview */}
      <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                <Zap size={16} /> Current Plan
              </div>
              <h2 className="text-4xl font-black mb-2">Enterprise Edition</h2>
              <p className="text-muted-foreground max-w-md">
                You are currently on the Enterprise annual plan. Your next billing date is <strong>January 01, 2027</strong> for $28,800.
              </p>
            </div>
            <div className="flex flex-col justify-center items-start md:items-end gap-3">
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Active Subscription</Badge>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-background">Manage Payment Method</Button>
                <Button>Upgrade to Unlimited</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Usage Limits */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>Track your feature limits based on your current Enterprise Plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 font-medium">
                  <Users size={18} className="text-muted-foreground" /> Licensed Users
                </div>
                <div className="text-sm font-semibold">42 <span className="text-muted-foreground font-normal">/ 50 users</span></div>
              </div>
              <Progress value={84} className="h-2 bg-muted [&>div]:bg-blue-500" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 font-medium">
                  <HardDrive size={18} className="text-muted-foreground" /> Storage Usage
                </div>
                <div className="text-sm font-semibold">412 GB <span className="text-muted-foreground font-normal">/ 500 GB</span></div>
              </div>
              <Progress value={82.4} className="h-2 bg-muted [&>div]:bg-primary" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 font-medium">
                  <Zap size={18} className="text-muted-foreground" /> AI Copilot Prompts (Monthly)
                </div>
                <div className="text-sm font-semibold">8,400 <span className="text-muted-foreground font-normal">/ 10,000 requests</span></div>
              </div>
              <Progress value={84} className="h-2 bg-muted [&>div]:bg-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Past payments and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {INVOICES.map((inv) => (
                <div key={inv.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border">
                  <div>
                    <div className="font-semibold text-sm">{inv.date}</div>
                    <div className="text-xs text-muted-foreground">{inv.id}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-sm">${inv.amount}</div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-2">View All Invoices</Button>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold">Plan Upgrades</h3>
            <p className="text-muted-foreground mt-1">Scale your business with higher limits and more features.</p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button 
              variant={billingCycle === "monthly" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setBillingCycle("monthly")}
            >Monthly</Button>
            <Button 
              variant={billingCycle === "annual" ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setBillingCycle("annual")}
            >Annual (Save 20%)</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col opacity-60 bg-muted/20">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For small teams.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${billingCycle === "annual" ? "49" : "59"}</span>
                <span className="text-muted-foreground">/mo per user</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-muted-foreground" /> Up to 10 users</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-muted-foreground" /> Basic Pipeline</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-muted-foreground" /> 50GB Storage</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full" disabled>Downgrade</Button>
            </div>
          </Card>

          <Card className="flex flex-col border-primary shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">Current Plan</div>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For scaling organizations.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${billingCycle === "annual" ? "99" : "119"}</span>
                <span className="text-muted-foreground">/mo per user</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary" /> Up to 50 users</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary" /> Advanced Analytics</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary" /> Target Management</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary" /> 500GB Storage</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30" disabled>Active</Button>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Unlimited</CardTitle>
              <CardDescription>Maximum power & AI limits.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${billingCycle === "annual" ? "199" : "249"}</span>
                <span className="text-muted-foreground">/mo per user</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Unlimited users</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Unlimited AI Copilot</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Dedicated Instance</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 10TB Storage</li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full">Upgrade</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
