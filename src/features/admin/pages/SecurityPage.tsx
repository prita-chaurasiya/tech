import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShieldAlert, Key, History, Download } from "lucide-react"

const MOCK_LOGS = [
  { id: 1, action: "User Login", user: "sarah@acme.com", ip: "192.168.1.104", status: "Success", time: "2 mins ago" },
  { id: 2, action: "Export Pipeline Data", user: "john@acme.com", ip: "10.0.0.52", status: "Success", time: "15 mins ago" },
  { id: 3, action: "Failed Login Attempt", user: "unknown", ip: "45.22.19.100", status: "Failed", time: "1 hour ago" },
  { id: 4, action: "Modified Role (Admin)", user: "sarah@acme.com", ip: "192.168.1.104", status: "Success", time: "3 hours ago" },
  { id: 5, action: "API Key Generated", user: "michael@acme.com", ip: "10.0.0.12", status: "Success", time: "1 day ago" },
]

export function SecurityPage() {
  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="p-6 border-b flex justify-between items-center bg-card/50">
        <div>
          <h2 className="text-xl font-bold">Security & Audit</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage authentication, security policies, and review audit logs.</p>
        </div>
        <Button variant="outline">
          <Download size={16} className="mr-2" /> Export Logs
        </Button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <ShieldCheck size={32} className="text-emerald-500 mb-2" />
              <div className="font-bold text-emerald-600 mb-1">System Secure</div>
              <div className="text-xs text-muted-foreground">All security protocols active</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Key size={32} className="text-primary mb-2" />
              <div className="font-bold mb-1">SSO & SAML</div>
              <div className="text-xs text-muted-foreground">Enforced for all users</div>
              <Button variant="link" className="h-auto p-0 mt-2 text-xs">Configure SSO</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <ShieldAlert size={32} className="text-orange-500 mb-2" />
              <div className="font-bold text-orange-600 mb-1">12 Failed Logins</div>
              <div className="text-xs text-muted-foreground">Detected in last 24 hours</div>
              <Button variant="link" className="h-auto p-0 mt-2 text-xs text-orange-600">View Incidents</Button>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <History size={18} className="text-muted-foreground" /> Recent Audit Logs
            </CardTitle>
            <CardDescription>Comprehensive record of all system activity.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-y">
                  <tr>
                    <th className="px-6 py-4 font-medium">Action</th>
                    <th className="px-6 py-4 font-medium">User / Identity</th>
                    <th className="px-6 py-4 font-medium">IP Address</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{log.action}</td>
                      <td className="px-6 py-4 text-muted-foreground">{log.user}</td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={log.status === "Success" ? "text-emerald-500 border-emerald-200 bg-emerald-500/10" : "text-red-500 border-red-200 bg-red-500/10"}>
                          {log.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right text-muted-foreground text-xs">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
