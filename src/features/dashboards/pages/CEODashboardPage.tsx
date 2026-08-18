import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import { ArrowUpRight, ArrowDownRight, Target, Activity, TrendingUp, AlertTriangle, Briefcase, Percent, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CEODashboardPage() {
  const revenueData = [
    { name: "Jan", actual: 42, target: 45 },
    { name: "Feb", actual: 44, target: 45 },
    { name: "Mar", actual: 48, target: 50 },
    { name: "Apr", actual: 51, target: 50 },
    { name: "May", actual: 49, target: 52 },
    { name: "Jun", actual: 48.2, target: 52 },
  ]

  const segmentData = [
    { name: "Enterprise", value: 2.1 },
    { name: "Mid-Market", value: 1.5 },
    { name: "SMB", value: 1.22 },
  ]

  const handleExport = () => {
    alert("Downloading CEO Report (PDF/CSV)...");
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CEO Dashboard</h1>
          <p className="text-muted-foreground mt-1">Company-wide revenue, pipeline, and high-level performance metrics.</p>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Revenue</p>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">₹4.82Cr</div>
              <span className="text-xs text-emerald-500 font-medium flex items-center">
                <ArrowUpRight size={14} /> +12.5%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Target</p>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">₹5.20Cr</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Achievement</p>
              <Percent className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-blue-600">92.7%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Forecast</p>
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-purple-600">₹5.13Cr</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Pipeline</p>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">₹12.8Cr</div>
              <span className="text-xs text-emerald-500 font-medium flex items-center">
                <ArrowUpRight size={14} /> +4.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Win Rate</p>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">27%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium">Average Deal</p>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">₹4.8L</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">At-Risk Revenue</p>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">₹1.1Cr</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target (YTD in ₹ Lakhs)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" />
                <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Segment (in ₹ Crores)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}Cr`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
