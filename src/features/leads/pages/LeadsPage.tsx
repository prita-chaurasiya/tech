import { useState } from "react"
import { LayoutGrid, List, Kanban, Plus, Download, Upload, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadGrid } from "../components/LeadGrid"
import { LeadKanban } from "../components/LeadKanban"
import { LeadTable } from "../components/LeadTable"
import { useDataStore } from "@/store/useDataStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LeadsPage() {
  const [view, setView] = useState<"table" | "kanban" | "grid">("table")
  const { leads, addLead } = useDataStore()
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New" as const,
    score: 50,
    value: 0,
    owner: "Jane Doe",
    source: "Website",
    lastContact: new Date().toISOString().split('T')[0],
    tags: []
  })

  const handleAddLead = () => {
    if (!newLead.name || !newLead.company) return
    addLead(newLead)
    setIsAddLeadOpen(false)
    setNewLead({
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "New",
      score: 50,
      value: 0,
      owner: "Jane Doe",
      source: "Website",
      lastContact: new Date().toISOString().split('T')[0],
      tags: []
    })
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Company,Status,Value\n"
      + leads.map(e => `${e.name},${e.company},${e.status},${e.value}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleImport = () => {
    alert("Import functionality would open a file picker here.");
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage, qualify, and convert your incoming prospects.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 md:flex-none w-full md:w-auto mt-2 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={newLead.name} 
                    onChange={e => setNewLead({...newLead, name: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    value={newLead.company} 
                    onChange={e => setNewLead({...newLead, company: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={newLead.email} 
                    onChange={e => setNewLead({...newLead, email: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Estimated Value (₹)</Label>
                  <Input 
                    id="value" 
                    type="number" 
                    value={newLead.value || ''} 
                    onChange={e => setNewLead({...newLead, value: Number(e.target.value)})} 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>Cancel</Button>
                <Button onClick={handleAddLead} disabled={!newLead.name || !newLead.company}>Save Lead</Button>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Input placeholder="Search leads..." className="h-9" />
          <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:w-auto h-9">
            <TabsTrigger value="table" className="px-3">
              <List className="h-4 w-4 mr-2" />
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="px-3">
              <Kanban className="h-4 w-4 mr-2" />
              Board
            </TabsTrigger>
            <TabsTrigger value="grid" className="px-3">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 min-h-0 bg-transparent overflow-auto">
        {view === "table" && (
          <div className="h-full">
            <LeadTable leads={leads} />
          </div>
        )}
        {view === "kanban" && (
          <div className="h-full">
            <LeadKanban leads={leads} />
          </div>
        )}
        {view === "grid" && (
          <div className="h-full p-1 pb-6">
            <LeadGrid leads={leads} />
          </div>
        )}
      </div>
    </div>
  )
}
