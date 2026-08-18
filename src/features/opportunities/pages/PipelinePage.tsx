import { useState } from "react"
import { OpportunityKanban } from "../components/OpportunityKanban"
import { OpportunityList } from "../components/OpportunityList"
import { PipelineAnalytics } from "../components/PipelineAnalytics"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, LayoutGrid, Kanban, List, PieChart, Upload, Download } from "lucide-react"
import { useDataStore } from "@/store/useDataStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function PipelinePage() {
  const [view, setView] = useState("kanban")
  const { opportunities, addOpportunity } = useDataStore()
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [newOpp, setNewOpp] = useState({
    title: "",
    customer: "",
    value: 0,
    stage: "Discovery" as const,
    probability: 20,
    expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    owner: "Jane Doe"
  })

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Customer,Value,Stage,Probability\n"
      + opportunities.map(e => `${e.title},${e.customer},${e.value},${e.stage},${e.probability}%`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "opportunities_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleAdd = () => {
    if (!newOpp.title || !newOpp.customer) return
    addOpportunity(newOpp)
    setIsAddOpen(false)
    setNewOpp({
      title: "",
      customer: "",
      value: 0,
      stage: "Discovery",
      probability: 20,
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: "Jane Doe"
    })
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunity Pipeline</h1>
          <p className="text-muted-foreground mt-1">Manage and track all deals across your sales process.</p>
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
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 md:flex-none w-full md:w-auto mt-2 md:mt-0">
                <Plus className="mr-2 h-4 w-4" /> New Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Opportunity</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Opportunity Title</Label>
                  <Input value={newOpp.title} onChange={e => setNewOpp({...newOpp, title: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Customer/Account</Label>
                  <Input value={newOpp.customer} onChange={e => setNewOpp({...newOpp, customer: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Expected Value (₹)</Label>
                  <Input type="number" value={newOpp.value || ''} onChange={e => setNewOpp({...newOpp, value: Number(e.target.value)})} />
                </div>
                <div className="grid gap-2">
                  <Label>Probability (%)</Label>
                  <Input type="number" value={newOpp.probability || ''} onChange={e => setNewOpp({...newOpp, probability: Number(e.target.value)})} max={100} min={0} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} disabled={!newOpp.title || !newOpp.customer}>Save Deal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass-card p-3 rounded-xl border shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search opportunities, accounts, or owners..." 
              className="pl-9 bg-background/50 border-border/50 focus-visible:bg-background transition-all shadow-none h-10"
            />
          </div>
        </div>

        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 h-10">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban size={16} /> <span className="hidden sm:inline">Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List size={16} /> <span className="hidden sm:inline">List View</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart size={16} /> <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 min-h-0 bg-transparent overflow-hidden">
        {view === "kanban" && (
          <OpportunityKanban opportunities={opportunities} />
        )}
        {view === "list" && (
          <OpportunityList opportunities={opportunities} />
        )}
        {view === "analytics" && (
          <PipelineAnalytics opportunities={opportunities} />
        )}
      </div>
    </div>
  )
}
