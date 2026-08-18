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
  MessageSquare,
  Mail,
  Camera,
  Mic,
  Receipt,
  FileText,
  Key
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
    label: "Field Sales",
    items: [
      { name: "Visit Planning", path: "/field/planning", icon: MapPin },
      { name: "GPS Check-in", path: "/field/check-in", icon: MapPin },
      { name: "GPS Check-out", path: "/field/check-out", icon: MapPin },
      { name: "Expenses", path: "/field/expenses", icon: Receipt },
      { name: "Photos", path: "/field/photos", icon: Camera },
      { name: "Voice Notes", path: "/field/voice-notes", icon: Mic },
    ]
  },
  {
    label: "Communication",
    items: [
      { name: "WhatsApp", path: "/communication/whatsapp", icon: MessageSquare },
      { name: "Email", path: "/communication/email", icon: Mail },
      { name: "SMS", path: "/communication/sms", icon: MessageSquare },
      { name: "Calling", path: "/communication/calling", icon: Phone },
      { name: "Calendar", path: "/communication/calendar", icon: Calendar },
    ]
  },
  {
    label: "Targets",
    items: [
      { name: "Company Target", path: "/targets", icon: Crosshair },
      { name: "Region Target", path: "/targets/region", icon: Crosshair },
      { name: "Branch Target", path: "/targets/branch", icon: Crosshair },
      { name: "Team Target", path: "/targets/team", icon: Crosshair },
      { name: "Salesperson Target", path: "/targets/salesperson", icon: Crosshair },
      { name: "Allocation", path: "/targets/allocation", icon: Crosshair },
      { name: "Hierarchy", path: "/targets/hierarchy", icon: Crosshair },
      { name: "KPI Dashboard", path: "/kpi", icon: Activity },
      { name: "KPI Engine", path: "/kpi/engine", icon: Settings },
      { name: "KPI Score", path: "/kpi/score", icon: Medal },
      { name: "KPI Trends", path: "/kpi/trends", icon: TrendingUp },
    ]
  },
  {
    label: "Performance",
    items: [
      { name: "Leaderboard", path: "/performance", icon: Medal },
      { name: "Salesperson Score", path: "/performance/score", icon: Award },
      { name: "Team Performance", path: "/performance/team", icon: Users },
      { name: "Incentives", path: "/performance/incentives", icon: Briefcase },
      { name: "Commission Engine", path: "/performance/commission", icon: Settings },
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
      { name: "Product", path: "/analytics/product", icon: Box },
      { name: "Win/Loss", path: "/analytics/winloss", icon: PieChart },
      { name: "Funnel", path: "/analytics/funnel", icon: Target },
    ]
  },
  {
    label: "AI",
    items: [
      { name: "AI Copilot", path: "/copilot", icon: Bot },
      { name: "Lead Scoring", path: "/copilot/lead-scoring", icon: Zap },
      { name: "Opp Scoring", path: "/copilot/opp-scoring", icon: Zap },
      { name: "Sales Manager", path: "/copilot/manager", icon: Users },
      { name: "Daily Briefing", path: "/copilot/briefing", icon: FileText },
      { name: "Content Gen", path: "/copilot/content", icon: FileText },
      { name: "AI Insights", path: "/copilot/insights", icon: Zap },
      { name: "Deal Risk", path: "/copilot/risk", icon: AlertTriangle },
      { name: "Sales Forecast", path: "/copilot/forecast", icon: LineChart },
      { name: "Next Best Action", path: "/copilot/action", icon: Target },
      { name: "Sales Coach", path: "/copilot/coach", icon: MessageSquare },
    ]
  },
  {
    label: "Reports",
    items: [
      { name: "Sales Reports", path: "/reports/sales", icon: FileText },
      { name: "Activity Reports", path: "/reports/activity", icon: FileText },
      { name: "KPI Reports", path: "/reports/kpi", icon: FileText },
      { name: "Forecast Reports", path: "/reports/forecast", icon: FileText },
      { name: "Territory Reports", path: "/reports/territory", icon: FileText },
      { name: "Customer Reports", path: "/reports/customer", icon: FileText },
    ]
  },
  {
    label: "Administration",
    items: [
      { name: "Users", path: "/settings/users", icon: User },
      { name: "Roles", path: "/settings/roles", icon: Shield },
      { name: "Teams", path: "/settings/teams", icon: Users },
      { name: "Branches", path: "/settings/branches", icon: Building },
      { name: "Departments", path: "/settings/departments", icon: Building },
      { name: "Products", path: "/settings/products", icon: Box },
      { name: "Territories", path: "/settings/territories", icon: Map },
      { name: "Settings", path: "/settings", icon: Settings },
      { name: "Company Settings", path: "/settings/company", icon: Settings },
      { name: "Audit Logs", path: "/settings/audit", icon: FileText },
    ]
  },
  {
    label: "Account",
    items: [
      { name: "Subscription", path: "/account/subscription", icon: CreditCard },
      { name: "Billing", path: "/account/billing", icon: Receipt },
      { name: "API Keys", path: "/account/api-keys", icon: Key },
    ]
  }
]
