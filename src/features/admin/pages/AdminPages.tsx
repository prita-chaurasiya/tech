import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Shield, Building, Box, Map, CreditCard, Search, Filter, MoreHorizontal, Plus, Download, Mail, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
// --- Users List Page ---
export function UsersListPage() {
  const mockUsers = [
    { id: "1", name: "Alice CEO", email: "alice@acme.com", role: "Super Admin", status: "Active", lastActive: "2 mins ago" },
    { id: "2", name: "Bob VP", email: "bob@acme.com", role: "Sales Manager", status: "Active", lastActive: "1 hr ago" },
    { id: "3", name: "Charlie Rep", email: "charlie@acme.com", role: "Salesperson", status: "Offline", lastActive: "1 day ago" },
    { id: "4", name: "Diana Rep", email: "diana@acme.com", role: "Salesperson", status: "Invited", lastActive: "Never" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground mt-1">Manage organization users, roles, and invitations.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button onClick={() => toast.info("Feature coming soon")} className="flex-1 md:flex-none"><Plus className="mr-2 h-4 w-4" /> Invite User</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by name or email..." className="pl-9 bg-background" />
        </div>
        <Button variant="secondary" className="w-full md:w-auto whitespace-nowrap"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400' :
                        user.status === 'Invited' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400' :
                        'bg-muted text-muted-foreground'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Resend Invite</DropdownMenuItem>
                          <DropdownMenuItem><Lock className="mr-2 h-4 w-4" /> Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Roles & Permissions Page ---
export function RolesPermissionsPage() {
  const modules = ["Leads", "Opportunities", "Customers", "Reports", "Settings"]
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
          <p className="text-muted-foreground mt-1">Configure access control levels for your tenant.</p>
        </div>
        <Button onClick={() => toast.info("Feature coming soon")} className="w-full md:w-auto"><Plus className="mr-2 h-4 w-4" /> Create Role</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Roles</CardTitle>
          </CardHeader>
          <div className="flex flex-col">
            <button className="flex items-center justify-between px-6 py-3 bg-muted/50 border-l-2 border-primary font-medium">
              Super Admin <Badge>4</Badge>
            </button>
            <button className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 border-l-2 border-transparent">
              Sales Manager <Badge variant="secondary">12</Badge>
            </button>
            <button className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 border-l-2 border-transparent">
              Salesperson <Badge variant="secondary">45</Badge>
            </button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Super Admin Permissions</CardTitle>
                <CardDescription>Full access to all system modules and settings.</CardDescription>
              </div>
              <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-primary p-1">
                <div className="h-4 w-4 translate-x-3 rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead className="text-center">View</TableHead>
                    <TableHead className="text-center">Create</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map((mod) => (
                    <TableRow key={mod}>
                      <TableCell className="font-medium">{mod}</TableCell>
                      <TableCell className="text-center"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" /></TableCell>
                      <TableCell className="text-center"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" /></TableCell>
                      <TableCell className="text-center"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" /></TableCell>
                      <TableCell className="text-center"><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// --- Teams Page ---
export function TeamsPage() {
  const mockTeams = [
    { id: "1", name: "North America Enterprise", members: 12, lead: "Bob VP", performance: "+14%" },
    { id: "2", name: "EMEA Commercial", members: 8, lead: "Sarah Dir", performance: "+5%" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
          <p className="text-muted-foreground mt-1">Organize users into sales teams and departments.</p>
        </div>
        <Button onClick={() => toast.info("Feature coming soon")} className="w-full md:w-auto"><Plus className="mr-2 h-4 w-4" /> Create Team</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeams.map(team => (
          <Card key={team.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Team</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>Led by {team.lead}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{team.members}</span>
                  <span className="text-xs text-muted-foreground">Members</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-emerald-500">{team.performance}</span>
                  <span className="text-xs text-muted-foreground">QTD Target</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// --- Branches Page ---
export function BranchesPage() {
  const mockBranches = [
    { id: "1", name: "HQ - San Francisco", region: "North America", address: "123 Tech Lane, CA" },
    { id: "2", name: "London Hub", region: "EMEA", address: "45 Old Street, London" },
  ]
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Branches</h2>
          <p className="text-muted-foreground mt-1">Manage physical office locations.</p>
        </div>
        <Button onClick={() => toast.info("Feature coming soon")} className="w-full md:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Branch</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBranches.map(branch => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {branch.name}
                    </TableCell>
                    <TableCell>{branch.region}</TableCell>
                    <TableCell className="text-muted-foreground">{branch.address}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products & Services</h2>
          <p className="text-muted-foreground">Manage the product catalog and pricing for opportunities.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Box className="w-5 h-5" /> Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Product catalog is empty.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function TerritoriesAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Territories</h2>
          <p className="text-muted-foreground">Define sales regions, pincode mapping, and distributor territories.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Map className="w-5 h-5" /> Territory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No territories defined.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SubscriptionBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription & Billing</h2>
          <p className="text-muted-foreground">Manage your SaaS subscription, limits, and billing history.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Plan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            You are currently on a Free Trial.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
