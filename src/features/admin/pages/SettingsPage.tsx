import { useState } from "react"
import { UsersRolesPage } from "./UsersRolesPage"
import { SecurityPage } from "./SecurityPage"
import { BillingPage } from "../../billing/pages/BillingPage"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Users, ShieldAlert, CreditCard, Building2, Key, Bell, Database } from "lucide-react"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")

  const SIDEBAR_NAV = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "users", label: "Users & Roles", icon: Users },
    { id: "security", label: "Security & Audit", icon: ShieldAlert },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "data", label: "Data Management", icon: Database },
  ]

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your enterprise operating system preferences and administration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Settings Sidebar Nav */}
        <Card className="lg:w-64 shrink-0 h-fit bg-card/50">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {SIDEBAR_NAV.map((item) => (
                <Button 
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start ${activeTab === item.id ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon size={16} className={`mr-2 ${activeTab === item.id ? "text-primary" : "text-muted-foreground"}`} />
                  {item.label}
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content Area */}
        <div className="flex-1 overflow-auto rounded-xl">
          {activeTab === "users" && <UsersRolesPage />}
          {activeTab === "security" && <SecurityPage />}
          {activeTab === "billing" && <BillingPage />}
          
          {/* Stubs for other tabs */}
          {activeTab !== "users" && activeTab !== "security" && activeTab !== "billing" && (
            <div className="h-full bg-card border shadow-sm rounded-xl flex flex-col items-center justify-center text-muted-foreground min-h-[400px]">
              <SettingsIcon size={48} className="opacity-20 mb-4" />
              <h3 className="text-lg font-medium">{SIDEBAR_NAV.find(n => n.id === activeTab)?.label} (Coming Soon)</h3>
              <p className="text-sm mt-1">This module is part of the Enterprise Administration suite.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
