import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Search, Building2, Download, Trash2, Filter, Settings, FileText, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

// --- Company Settings (Company Profile) ---
const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters."),
  domain: z.string().min(4, "Domain is required."),
  address: z.string().min(5, "Address is required."),
  taxId: z.string().min(2, "Tax ID is required."),
  tenantMode: z.string(),
})

export function CompanySettingsPage() {
  const [loading, setLoading] = useState(false)
  
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "Acme Corp",
      domain: "acme.com",
      address: "123 Tech Lane, Silicon Valley, CA 94025",
      taxId: "TAX-987654321",
      tenantMode: "multi",
    },
  })

  const onSubmit = (data: z.infer<typeof companySchema>) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Company profile updated successfully.", {
        description: "Your settings have been saved globally."
      })
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Company Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your organization's global profile and tenant settings.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="general">General Profile</TabsTrigger>
          <TabsTrigger value="tenant">Tenant & Branding</TabsTrigger>
        </TabsList>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company's core details and registered address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Primary Domain</Label>
                    <Input id="domain" {...form.register("domain")} />
                    {form.formState.errors.domain && (
                      <p className="text-sm text-destructive">{form.formState.errors.domain.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Registered Address</Label>
                  <Input id="address" {...form.register("address")} />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                    <Input id="taxId" {...form.register("taxId")} />
                    {form.formState.errors.taxId && (
                      <p className="text-sm text-destructive">{form.formState.errors.taxId.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenant" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Mode</CardTitle>
                <CardDescription>Configure how your organization handles multiple entities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2 max-w-md">
                  <Label>Multi-Tenant Setup</Label>
                  <Select 
                    defaultValue={form.getValues("tenantMode")} 
                    onValueChange={(val) => form.setValue("tenantMode", val as string)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Tenant</SelectItem>
                      <SelectItem value="multi">Multi-Tenant (Holding Company)</SelectItem>
                      <SelectItem value="franchise">Franchise Mode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6 flex items-center justify-end">
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

// --- Departments Management ---
export function DepartmentsPage() {
  const mockDepts = [
    { id: "d1", name: "Executive", head: "Alice CEO", headcount: 5, status: "Active" },
    { id: "d2", name: "Sales", head: "Bob VP", headcount: 45, status: "Active" },
    { id: "d3", name: "Engineering", head: "Charlie CTO", headcount: 120, status: "Active" },
    { id: "d4", name: "Marketing", head: "Diana CMO", headcount: 15, status: "Active" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground mt-1">Manage organizational hierarchy and department heads.</p>
        </div>
        <Button onClick={() => toast.info("Feature coming soon")} className="w-full md:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Department</Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search departments..." className="pl-9 bg-background" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Department Head</TableHead>
                  <TableHead className="text-center">Headcount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDepts.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      {dept.name}
                    </TableCell>
                    <TableCell>{dept.head}</TableCell>
                    <TableCell className="text-center">{dept.headcount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400">
                        {dept.status}
                      </Badge>
                    </TableCell>
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

// --- Audit Logs ---
export function AuditLogsPage() {
  const mockLogs = [
    { id: "1", action: "User Login", user: "john@acme.com", ip: "192.168.1.1", date: "2024-05-10 10:23 AM", status: "Success" },
    { id: "2", action: "Deleted Deal", user: "jane@acme.com", ip: "10.0.0.5", date: "2024-05-10 11:45 AM", status: "Warning" },
    { id: "3", action: "Updated Profile", user: "bob@acme.com", ip: "172.16.2.3", date: "2024-05-11 09:12 AM", status: "Success" },
    { id: "4", action: "Failed Login", user: "unknown", ip: "45.22.1.99", date: "2024-05-11 14:33 PM", status: "Failed" },
  ]

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground mt-1">Review system activities and security events.</p>
        </div>
        <Button variant="outline" className="w-full md:w-auto"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs by action or user..." className="pl-9 bg-background" />
        </div>
        <Button variant="secondary" className="w-full md:w-auto whitespace-nowrap"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{log.date}</TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        log.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400' :
                        log.status === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400' :
                        'bg-destructive/10 text-destructive border-destructive/20'
                      }>
                        {log.status}
                      </Badge>
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
