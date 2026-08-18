import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Plus, Building2, MapPin, Download, Upload, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useDataStore } from "@/store/useDataStore"

export function CustomerListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { customers, addCustomer } = useDataStore()
  const [isAddOpen, setIsAddOpen] = useState(false)
  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    industry: "",
    arr: 0,
    healthScore: 100,
    status: "Active" as const,
    renewalDate: new Date().toISOString().split('T')[0],
    owner: "Jane Doe",
    tier: "SMB" as const,
    territory: "North"
  })

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 bg-emerald-500/10"
    if (score >= 60) return "text-blue-500 bg-blue-500/10"
    if (score >= 40) return "text-orange-500 bg-orange-500/10"
    return "text-red-500 bg-red-500/10"
  }

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`
    return `₹${val}`
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Industry,ARR,Status\n"
      + customers.map(e => `${e.name},${e.industry},${e.arr},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.industry) return
    addCustomer(newCustomer)
    setIsAddOpen(false)
    setNewCustomer({
      name: "",
      industry: "",
      arr: 0,
      healthScore: 100,
      status: "Active",
      renewalDate: new Date().toISOString().split('T')[0],
      owner: "Jane Doe",
      tier: "SMB",
      territory: "North"
    })
  }

  return (
    <div className="flex flex-col h-full gap-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer portfolio and relationships.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => alert("Import placeholder")}>
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 md:flex-none w-full md:w-auto mt-2 md:mt-0">
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Industry</Label>
                  <Input value={newCustomer.industry} onChange={e => setNewCustomer({...newCustomer, industry: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Annual Revenue (₹)</Label>
                  <Input type="number" value={newCustomer.arr || ''} onChange={e => setNewCustomer({...newCustomer, arr: Number(e.target.value)})} />
                </div>
                <div className="grid gap-2">
                  <Label>Territory</Label>
                  <Input value={newCustomer.territory} onChange={e => setNewCustomer({...newCustomer, territory: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} disabled={!newCustomer.name}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-card p-2 rounded-lg border shadow-sm max-w-md">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <Input 
          placeholder="Search by name, industry, territory..." 
          className="border-transparent bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Industry & Territory</th>
                  <th className="px-6 py-4 font-medium">Annual Revenue</th>
                  <th className="px-6 py-4 font-medium">Health Score</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border rounded-lg">
                          <AvatarFallback className="bg-primary/10 text-primary rounded-lg font-bold">
                            {customer.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold group-hover:text-primary transition-colors">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5"><Building2 size={12} /> {customer.industry}</div>
                        <div className="flex items-center gap-1.5"><MapPin size={12} /> {customer.territory}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {formatCurrency(customer.arr)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${getHealthColor(customer.health)}`}>
                          {customer.health}/100
                        </span>
                        {customer.health < 60 && <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 text-[10px]">Churn Risk</Badge>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className={customer.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-transparent" : "bg-orange-500/10 text-orange-600 border-transparent"}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-foreground">
                        <ChevronRight size={18} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
