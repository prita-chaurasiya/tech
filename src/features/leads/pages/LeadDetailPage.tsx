import { useParams, Link } from "react-router-dom"
import { mockActivities } from "../data/mockData"
import { LeadTimeline } from "../components/LeadTimeline"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, Mail, Phone, Flame, MapPin, ArrowLeft, MoreHorizontal, Edit, Sparkles } from "lucide-react"
import { useDataStore } from "@/store/useDataStore"

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const leads = useDataStore(state => state.leads)
  const lead = leads.find(l => l.id === id) || leads[0]
  const activities = mockActivities.filter(a => a.leadId === lead.id)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-red-500 bg-red-500/10"
    if (score >= 70) return "text-orange-500 bg-orange-500/10"
    return "text-blue-500 bg-blue-500/10"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <Building2 size={14} /> {lead.company}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Convert to Deal</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge variant="secondary">{lead.status}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="flex items-center gap-2 font-medium">
                      <Mail size={14} className="text-muted-foreground" /> {lead.email}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <div className="flex items-center gap-2 font-medium">
                      <Phone size={14} className="text-muted-foreground" /> {lead.phone}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Lead Source</div>
                    <div className="font-medium">{lead.source}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Estimated Value</div>
                    <div className="font-medium">${lead.value.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin size={14} className="text-muted-foreground" /> San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <LeadTimeline activities={activities} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">No activities recorded yet.</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-accent/20 bg-accent/5 overflow-hidden relative">
            <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
              <Flame size={100} className="text-accent" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={18} className="text-accent" /> AI Lead Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-4xl font-bold ${getScoreColor(lead.score).split(" ")[0]}`}>
                  {lead.score}
                </span>
                <span className="text-muted-foreground">/ 100</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-medium text-green-500">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Budget Match</span>
                  <span className="font-medium">Medium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Intent</span>
                  <span className="font-medium text-green-500">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Owner</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{lead.owner.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{lead.owner}</div>
                <div className="text-sm text-muted-foreground">Sales Executive</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {lead.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
