import {
  LayoutDashboard,
  Users,
  Briefcase,
  TrendingUp,
  Target,
  Crosshair,
  Activity,
  Bot,
  BarChart3,
  Settings,
  Medal,
  Phone,
  Calendar,
  MapPin,
  CheckSquare,
  RefreshCw,
  Award,
  Zap,
  Shield,
  PieChart,
  User,
  Building,
  Box,
  Map,
  CreditCard,
  LineChart,
  AlertTriangle,
  MessageSquare
} from "lucide-react"

export const navGroups = [
  {
    label: "Dashboard",
    items: [
      { name: "CEO Dashboard", path: "/", icon: LayoutDashboard },
      { name: "Manager Dashboard", path: "/manager", icon: Users },
      { name: "Action Dashboard", path: "/salesperson", icon: Zap },
    ]
  },
  {
    label: "Sales",
    items: [
      { name: "Leads", path: "/leads", icon: TrendingUp },
      { name: "Accounts", path: "/customers", icon: Building },
      { name: "Contacts", path: "/contacts", icon: Users },
      { name: "Opportunities", path: "/opportunities", icon: Briefcase },
      { name: "Pipeline", path: "/pipeline", icon: Target },
    ]
  },
  {
    label: "Activities",
    items: [
      { name: "Tasks", path: "/tasks", icon: CheckSquare },
      { name: "Calls", path: "/calls", icon: Phone },
      { name: "Meetings", path: "/meetings", icon: Calendar },
      { name: "Visits", path: "/visits", icon: MapPin },
      { name: "Follow-ups", path: "/followups", icon: RefreshCw },
    ]
  },
  {
    label: "Targets",
    items: [
      { name: "Company Target", path: "/targets", icon: Crosshair },
      { name: "Team Target", path: "/targets/team", icon: Crosshair },
      { name: "Salesperson Target", path: "/targets/salesperson", icon: Crosshair },
      { name: "KPI", path: "/kpi", icon: Activity },
    ]
  },
  {
    label: "Performance",
    items: [
      { name: "Leaderboard", path: "/performance", icon: Medal },
      { name: "Salesperson Score", path: "/performance/score", icon: Award },
      { name: "Team Performance", path: "/performance/team", icon: Users },
      { name: "Incentives", path: "/performance/incentives", icon: Briefcase },
    ]
  },
  {
    label: "Analytics",
    items: [
      { name: "Revenue", path: "/analytics", icon: BarChart3 },
      { name: "Pipeline", path: "/analytics/pipeline", icon: LineChart },
      { name: "Forecast", path: "/analytics/forecast", icon: TrendingUp },
      { name: "Conversion", path: "/analytics/conversion", icon: PieChart },
      { name: "Territory", path: "/analytics/territory", icon: Map },
      { name: "Customer", path: "/analytics/customer", icon: Users },
    ]
  },
  {
    label: "AI",
    items: [
      { name: "AI Copilot", path: "/copilot", icon: Bot },
      { name: "AI Insights", path: "/copilot/insights", icon: Zap },
      { name: "Deal Risk", path: "/copilot/risk", icon: AlertTriangle },
      { name: "Sales Forecast", path: "/copilot/forecast", icon: LineChart },
      { name: "Next Best Action", path: "/copilot/action", icon: Target },
      { name: "Sales Coach", path: "/copilot/coach", icon: MessageSquare },
    ]
  },
  {
    label: "Administration",
    items: [
      { name: "Users", path: "/settings/users", icon: User },
      { name: "Roles", path: "/settings/roles", icon: Shield },
      { name: "Teams", path: "/settings/teams", icon: Users },
      { name: "Branches", path: "/settings/branches", icon: Building },
      { name: "Products", path: "/settings/products", icon: Box },
      { name: "Territories", path: "/settings/territories", icon: Map },
      { name: "Settings", path: "/settings", icon: Settings },
      { name: "Subscription", path: "/settings/subscription", icon: CreditCard },
    ]
  }
]
