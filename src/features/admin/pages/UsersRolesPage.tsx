import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, ShieldCheck, MoreHorizontal } from "lucide-react"

const MOCK_USERS = [
  { id: 1, name: "Sarah Connor", email: "sarah@acme.com", role: "CEO", department: "Executive", status: "Active" },
  { id: 2, name: "John Smith", email: "john@acme.com", role: "Sales Manager", department: "Sales NA", status: "Active" },
  { id: 3, name: "Emma Davis", email: "emma@acme.com", role: "Salesperson", department: "Sales EMEA", status: "Active" },
  { id: 4, name: "Michael Chang", email: "michael@acme.com", role: "Admin", department: "IT", status: "Active" },
  { id: 5, name: "Lisa Wong", email: "lisa@acme.com", role: "Salesperson", department: "Sales APAC", status: "Inactive" },
]

export function UsersRolesPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b flex justify-between items-center bg-card/50">
        <div>
          <h2 className="text-xl font-bold">Users & Roles</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage employee access and organizational structure.</p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" /> Invite User
        </Button>
      </div>

      <div className="p-6 border-b bg-card">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <ShieldCheck size={16} className="mr-2" /> Permission Matrix
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-card/30">
        <div className="rounded-lg border shadow-sm bg-card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-background">{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.department}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className={user.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-transparent" : "bg-muted text-muted-foreground border-transparent"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
