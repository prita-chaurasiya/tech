import React, { useState, useEffect } from "react"
import { Search, Plus, Loader2, ArrowUpDown, MoreHorizontal, FileEdit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export interface GenericModuleProps {
  moduleName: string
  description: string
  columns: string[]
  mockData: any[]
}

export function GenericModuleTemplate({ moduleName, description, columns, mockData }: GenericModuleProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [mockData])

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  )

  const handleSave = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDialogOpen(false)
      const isNew = !formData.id
      if (isNew) {
        setData([{ id: Math.random().toString(36).substr(2, 9), ...formData }, ...data])
        toast.success(`${moduleName} record created successfully.`)
      } else {
        setData(data.map((item) => (item.id === formData.id ? { ...item, ...formData } : item)))
        toast.success(`${moduleName} record updated successfully.`)
      }
      setFormData({})
    }, 600)
  }

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
    toast.success("Record deleted successfully.")
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{moduleName}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button onClick={() => { setFormData({}); setIsDialogOpen(true) }} className="w-full md:w-auto gap-2">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p>Loading {moduleName.toLowerCase()} data...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No records found</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">
              {search ? `No results match your search "${search}".` : `There are no ${moduleName.toLowerCase()} records yet. Click "Add New" to create one.`}
            </p>
            {search && (
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {columns.map((col) => (
                    <TableHead key={col} className="font-semibold whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                        {col}
                        <ArrowUpDown size={14} className="opacity-50" />
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    {columns.map((col) => (
                      <TableCell key={`${row.id}-${col}`} className="max-w-[200px] truncate">
                        {row[col.toLowerCase().replace(/ /g, "")] || "—"}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => { setFormData(row); setIsDialogOpen(true) }}>
                            <FileEdit className="mr-2 h-4 w-4" /> Edit Record
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => handleDelete(row.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit' : 'Add New'} {moduleName}</DialogTitle>
            <DialogDescription>
              Fill out the form below to {formData.id ? 'update' : 'create'} this record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {columns.map((col) => {
              const key = col.toLowerCase().replace(/ /g, "")
              return (
                <div key={key} className="flex flex-col gap-2">
                  <Label htmlFor={key}>{col}</Label>
                  <Input
                    id={key}
                    value={formData[key] || ""}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={`Enter ${col.toLowerCase()}...`}
                  />
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {formData.id ? 'Save Changes' : 'Create Record'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
