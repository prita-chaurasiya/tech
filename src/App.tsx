import { Suspense, lazy } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { AppLayout } from "./layout/AppLayout"
import { PlaceholderPage } from "./components/PlaceholderPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Loader2 } from "lucide-react"
import { Toaster } from "sonner"

// Lazy load feature modules
const LeadsPage = lazy(() => import("./features/leads/pages/LeadsPage").then(m => ({ default: m.LeadsPage })))
const LeadDetailPage = lazy(() => import("./features/leads/pages/LeadDetailPage").then(m => ({ default: m.LeadDetailPage })))
const CustomerListPage = lazy(() => import("./features/customers/pages/CustomerListPage").then(m => ({ default: m.CustomerListPage })))
const Customer360Page = lazy(() => import("./features/customers/pages/Customer360Page").then(m => ({ default: m.Customer360Page })))
const PipelinePage = lazy(() => import("./features/opportunities/pages/PipelinePage").then(m => ({ default: m.PipelinePage })))
const OpportunityDetailPage = lazy(() => import("./features/opportunities/pages/OpportunityDetailPage").then(m => ({ default: m.OpportunityDetailPage })))
const TargetDashboardPage = lazy(() => import("./features/targets/pages/TargetDashboardPage").then(m => ({ default: m.TargetDashboardPage })))
const KPIDashboardPage = lazy(() => import("./features/kpi/pages/KPIDashboardPage").then(m => ({ default: m.KPIDashboardPage })))
const AICopilotPage = lazy(() => import("./features/copilot/pages/AICopilotPage").then(m => ({ default: m.AICopilotPage })))
const AnalyticsCenterPage = lazy(() => import("./features/analytics/pages/AnalyticsCenterPage").then(m => ({ default: m.AnalyticsCenterPage })))
const SettingsPage = lazy(() => import("./features/admin/pages/SettingsPage").then(m => ({ default: m.SettingsPage })))
const PerformancePage = lazy(() => import("./features/performance/pages/PerformancePage").then(m => ({ default: m.PerformancePage })))

const AuthLayout = lazy(() => import("./features/auth/pages/AuthLayout").then(m => ({ default: m.AuthLayout })))
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage").then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage").then(m => ({ default: m.RegisterPage })))
const ForgotPasswordPage = lazy(() => import("./features/auth/pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })))
const OTPVerificationPage = lazy(() => import("./features/auth/pages/OTPVerificationPage").then(m => ({ default: m.OTPVerificationPage })))
const ResetPasswordPage = lazy(() => import("./features/auth/pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage })))

const CEODashboardPage = lazy(() => import("./features/dashboards/pages/CEODashboardPage").then(m => ({ default: m.CEODashboardPage })))
const ManagerDashboardPage = lazy(() => import("./features/dashboards/pages/ManagerDashboardPage").then(m => ({ default: m.ManagerDashboardPage })))
const SalespersonDashboardPage = lazy(() => import("./features/dashboards/pages/SalespersonDashboardPage").then(m => ({ default: m.SalespersonDashboardPage })))

const TasksPage = lazy(() => import("./features/activities/pages/ActivitiesPages").then(m => ({ default: m.TasksPage })))
const CallsPage = lazy(() => import("./features/activities/pages/ActivitiesPages").then(m => ({ default: m.CallsPage })))
const MeetingsPage = lazy(() => import("./features/activities/pages/ActivitiesPages").then(m => ({ default: m.MeetingsPage })))
const VisitsPage = lazy(() => import("./features/activities/pages/ActivitiesPages").then(m => ({ default: m.VisitsPage })))
const FollowupsPage = lazy(() => import("./features/activities/pages/ActivitiesPages").then(m => ({ default: m.FollowupsPage })))

const TeamTargetPage = lazy(() => import("./features/targets/pages/TargetsPages").then(m => ({ default: m.TeamTargetPage })))
const SalespersonTargetPage = lazy(() => import("./features/targets/pages/TargetsPages").then(m => ({ default: m.SalespersonTargetPage })))
const SalespersonScorePage = lazy(() => import("./features/performance/pages/PerformancePages").then(m => ({ default: m.SalespersonScorePage })))
const TeamPerformancePage = lazy(() => import("./features/performance/pages/PerformancePages").then(m => ({ default: m.TeamPerformancePage })))
const IncentivesPage = lazy(() => import("./features/performance/pages/PerformancePages").then(m => ({ default: m.IncentivesPage })))

const PipelineAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsPages").then(m => ({ default: m.PipelineAnalyticsPage })))
const ForecastAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsPages").then(m => ({ default: m.ForecastAnalyticsPage })))
const ConversionAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsPages").then(m => ({ default: m.ConversionAnalyticsPage })))
const TerritoryAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsPages").then(m => ({ default: m.TerritoryAnalyticsPage })))
const CustomerAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsPages").then(m => ({ default: m.CustomerAnalyticsPage })))

const AIInsightsPage = lazy(() => import("./features/copilot/pages/CopilotPages").then(m => ({ default: m.AIInsightsPage })))
const DealRiskPage = lazy(() => import("./features/copilot/pages/CopilotPages").then(m => ({ default: m.DealRiskPage })))
const AISalesForecastPage = lazy(() => import("./features/copilot/pages/CopilotPages").then(m => ({ default: m.AISalesForecastPage })))
const NextBestActionPage = lazy(() => import("./features/copilot/pages/CopilotPages").then(m => ({ default: m.NextBestActionPage })))
const SalesCoachPage = lazy(() => import("./features/copilot/pages/CopilotPages").then(m => ({ default: m.SalesCoachPage })))

const UsersListPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.UsersListPage })))
const RolesPermissionsPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.RolesPermissionsPage })))
const TeamsPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.TeamsPage })))
const BranchesPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.BranchesPage })))
const ProductsPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.ProductsPage })))
const TerritoriesAdminPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.TerritoriesAdminPage })))
const SubscriptionBillingPage = lazy(() => import("./features/admin/pages/AdminPages").then(m => ({ default: m.SubscriptionBillingPage })))

// MISSING MODULES IMPORTS
const VisitPlanningPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.VisitPlanningPage })))
const GPSCheckInPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.GPSCheckInPage })))
const GPSCheckOutPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.GPSCheckOutPage })))
const ExpenseTrackingPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.ExpenseTrackingPage })))
const PhotosPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.PhotosPage })))
const VoiceNotesPage = lazy(() => import("./features/field-sales/pages/FieldSalesPages").then(m => ({ default: m.VoiceNotesPage })))

const WhatsAppPage = lazy(() => import("./features/communication/pages/CommunicationPages").then(m => ({ default: m.WhatsAppPage })))
const EmailPage = lazy(() => import("./features/communication/pages/CommunicationPages").then(m => ({ default: m.EmailPage })))
const SMSPage = lazy(() => import("./features/communication/pages/CommunicationPages").then(m => ({ default: m.SMSPage })))
const CallingPage = lazy(() => import("./features/communication/pages/CommunicationPages").then(m => ({ default: m.CallingPage })))
const CalendarPage = lazy(() => import("./features/communication/pages/CommunicationPages").then(m => ({ default: m.CalendarPage })))

const SalesReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.SalesReportsPage })))
const ActivityReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.ActivityReportsPage })))
const KPIReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.KPIReportsPage })))
const ForecastReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.ForecastReportsPage })))
const TerritoryReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.TerritoryReportsPage })))
const CustomerReportsPage = lazy(() => import("./features/reports/pages/ReportsPages").then(m => ({ default: m.CustomerReportsPage })))

const BillingPage = lazy(() => import("./features/account/pages/AccountPages").then(m => ({ default: m.BillingPage })))
const APIKeysPage = lazy(() => import("./features/account/pages/AccountPages").then(m => ({ default: m.APIKeysPage })))

const RegionTargetPage = lazy(() => import("./features/targets/pages/TargetModules").then(m => ({ default: m.RegionTargetPage })))
const BranchTargetPage = lazy(() => import("./features/targets/pages/TargetModules").then(m => ({ default: m.BranchTargetPage })))
const TargetAllocationPage = lazy(() => import("./features/targets/pages/TargetModules").then(m => ({ default: m.TargetAllocationPage })))
const TargetHierarchyPage = lazy(() => import("./features/targets/pages/TargetModules").then(m => ({ default: m.TargetHierarchyPage })))

const KPIEnginePage = lazy(() => import("./features/kpi/pages/KPIModules").then(m => ({ default: m.KPIEnginePage })))
const KPIScorePage = lazy(() => import("./features/kpi/pages/KPIModules").then(m => ({ default: m.KPIScorePage })))
const KPITrendsPage = lazy(() => import("./features/kpi/pages/KPIModules").then(m => ({ default: m.KPITrendsPage })))

const CommissionEnginePage = lazy(() => import("./features/performance/pages/PerformanceModules").then(m => ({ default: m.CommissionEnginePage })))

const ProductAnalyticsPage = lazy(() => import("./features/analytics/pages/AnalyticsModules").then(m => ({ default: m.ProductAnalyticsPage })))
const WinLossAnalysisPage = lazy(() => import("./features/analytics/pages/AnalyticsModules").then(m => ({ default: m.WinLossAnalysisPage })))
const FunnelAnalysisPage = lazy(() => import("./features/analytics/pages/AnalyticsModules").then(m => ({ default: m.FunnelAnalysisPage })))

const AILeadScoringPage = lazy(() => import("./features/copilot/pages/CopilotModules").then(m => ({ default: m.AILeadScoringPage })))
const AIOppScoringPage = lazy(() => import("./features/copilot/pages/CopilotModules").then(m => ({ default: m.AIOppScoringPage })))
const AISalesManagerPage = lazy(() => import("./features/copilot/pages/CopilotModules").then(m => ({ default: m.AISalesManagerPage })))
const AIDailyBriefingPage = lazy(() => import("./features/copilot/pages/CopilotModules").then(m => ({ default: m.AIDailyBriefingPage })))
const AIContentGeneratorPage = lazy(() => import("./features/copilot/pages/CopilotModules").then(m => ({ default: m.AIContentGeneratorPage })))

const DepartmentsPage = lazy(() => import("./features/admin/pages/AdminModules").then(m => ({ default: m.DepartmentsPage })))
const CompanySettingsPage = lazy(() => import("./features/admin/pages/AdminModules").then(m => ({ default: m.CompanySettingsPage })))
const AuditLogsPage = lazy(() => import("./features/admin/pages/AdminModules").then(m => ({ default: m.AuditLogsPage })))


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function LoadingFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/otp-verification" element={<OTPVerificationPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Protected App Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  {/* Dashboards */}
                  {/* Dashboards */}
                  <Route path="/" element={<CEODashboardPage />} />
                  <Route path="manager" element={<ManagerDashboardPage />} />
                  <Route path="salesperson" element={<SalespersonDashboardPage />} />
                  
                  {/* Leads */}
                  <Route path="leads">
                    <Route index element={<LeadsPage />} />
                    <Route path=":id" element={<LeadDetailPage />} />
                  </Route>
                  
                  {/* Pipeline / Opportunities */}
                  <Route path="pipeline" element={<PipelinePage />} />
                  <Route path="opportunities">
                    <Route index element={<PipelinePage />} />
                    <Route path=":id" element={<OpportunityDetailPage />} />
                  </Route>
                  
                  {/* Customers / Contacts */}
                  <Route path="customers">
                    <Route index element={<CustomerListPage />} />
                    <Route path=":id" element={<Customer360Page />} />
                  </Route>
                  <Route path="contacts" element={<CustomerListPage />} />
                  
                  {/* Performance */}
                  <Route path="performance">
                    <Route index element={<PerformancePage />} />
                    <Route path="score" element={<SalespersonScorePage />} />
                    <Route path="team" element={<TeamPerformancePage />} />
                    <Route path="incentives" element={<IncentivesPage />} />
                    <Route path="commission" element={<CommissionEnginePage />} />
                  </Route>
                  
                  {/* Targets */}
                  <Route path="targets">
                    <Route index element={<TargetDashboardPage />} />
                    <Route path="team" element={<TeamTargetPage />} />
                    <Route path="salesperson" element={<SalespersonTargetPage />} />
                    <Route path="region" element={<RegionTargetPage />} />
                    <Route path="branch" element={<BranchTargetPage />} />
                    <Route path="allocation" element={<TargetAllocationPage />} />
                    <Route path="hierarchy" element={<TargetHierarchyPage />} />
                  </Route>
                  
                  {/* KPI */}
                  <Route path="kpi">
                    <Route index element={<KPIDashboardPage />} />
                    <Route path="engine" element={<KPIEnginePage />} />
                    <Route path="score" element={<KPIScorePage />} />
                    <Route path="trends" element={<KPITrendsPage />} />
                  </Route>
                  
                  {/* Copilot */}
                  <Route path="copilot">
                    <Route index element={<AICopilotPage />} />
                    <Route path="insights" element={<AIInsightsPage />} />
                    <Route path="risk" element={<DealRiskPage />} />
                    <Route path="forecast" element={<AISalesForecastPage />} />
                    <Route path="action" element={<NextBestActionPage />} />
                    <Route path="coach" element={<SalesCoachPage />} />
                    <Route path="lead-scoring" element={<AILeadScoringPage />} />
                    <Route path="opp-scoring" element={<AIOppScoringPage />} />
                    <Route path="manager" element={<AISalesManagerPage />} />
                    <Route path="briefing" element={<AIDailyBriefingPage />} />
                    <Route path="content" element={<AIContentGeneratorPage />} />
                  </Route>

                  {/* Analytics */}
                  <Route path="analytics">
                    <Route index element={<AnalyticsCenterPage />} />
                    <Route path="pipeline" element={<PipelineAnalyticsPage />} />
                    <Route path="forecast" element={<ForecastAnalyticsPage />} />
                    <Route path="conversion" element={<ConversionAnalyticsPage />} />
                    <Route path="territory" element={<TerritoryAnalyticsPage />} />
                    <Route path="customer" element={<CustomerAnalyticsPage />} />
                    <Route path="product" element={<ProductAnalyticsPage />} />
                    <Route path="winloss" element={<WinLossAnalysisPage />} />
                    <Route path="funnel" element={<FunnelAnalysisPage />} />
                  </Route>

                  {/* Settings / Admin */}
                  <Route path="settings">
                    <Route index element={<SettingsPage />} />
                    <Route path="users" element={<UsersListPage />} />
                    <Route path="roles" element={<RolesPermissionsPage />} />
                    <Route path="teams" element={<TeamsPage />} />
                    <Route path="branches" element={<BranchesPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="territories" element={<TerritoriesAdminPage />} />
                    <Route path="subscription" element={<SubscriptionBillingPage />} />
                    <Route path="departments" element={<DepartmentsPage />} />
                    <Route path="company" element={<CompanySettingsPage />} />
                    <Route path="audit" element={<AuditLogsPage />} />
                  </Route>

                  {/* Activities */}
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="calls" element={<CallsPage />} />
                  <Route path="meetings" element={<MeetingsPage />} />
                  <Route path="visits" element={<VisitsPage />} />
                  <Route path="followups" element={<FollowupsPage />} />

                  {/* Field Sales */}
                  <Route path="field">
                    <Route path="planning" element={<VisitPlanningPage />} />
                    <Route path="check-in" element={<GPSCheckInPage />} />
                    <Route path="check-out" element={<GPSCheckOutPage />} />
                    <Route path="expenses" element={<ExpenseTrackingPage />} />
                    <Route path="photos" element={<PhotosPage />} />
                    <Route path="voice-notes" element={<VoiceNotesPage />} />
                  </Route>

                  {/* Communication */}
                  <Route path="communication">
                    <Route path="whatsapp" element={<WhatsAppPage />} />
                    <Route path="email" element={<EmailPage />} />
                    <Route path="sms" element={<SMSPage />} />
                    <Route path="calling" element={<CallingPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                  </Route>

                  {/* Reports */}
                  <Route path="reports">
                    <Route path="sales" element={<SalesReportsPage />} />
                    <Route path="activity" element={<ActivityReportsPage />} />
                    <Route path="kpi" element={<KPIReportsPage />} />
                    <Route path="forecast" element={<ForecastReportsPage />} />
                    <Route path="territory" element={<TerritoryReportsPage />} />
                    <Route path="customer" element={<CustomerReportsPage />} />
                  </Route>

                  {/* Account */}
                  <Route path="account">
                    <Route path="subscription" element={<SubscriptionBillingPage />} />
                    <Route path="billing" element={<BillingPage />} />
                    <Route path="api-keys" element={<APIKeysPage />} />
                  </Route>

                  {/* Fallback for Unimplemented Routes */}
                  <Route path="*" element={<PlaceholderPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
