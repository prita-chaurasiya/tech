import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { AppLayout } from "./layout/AppLayout"
import { PlaceholderPage } from "./components/PlaceholderPage"

// Lazy load feature modules later, for now we will place simple placeholders
import { LeadsPage } from "./features/leads/pages/LeadsPage"
import { LeadDetailPage } from "./features/leads/pages/LeadDetailPage"
import { CustomerListPage } from "./features/customers/pages/CustomerListPage"
import { Customer360Page } from "./features/customers/pages/Customer360Page"
import { PipelinePage } from "./features/opportunities/pages/PipelinePage"
import { OpportunityDetailPage } from "./features/opportunities/pages/OpportunityDetailPage"
import { TargetDashboardPage } from "./features/targets/pages/TargetDashboardPage"
import { KPIDashboardPage } from "./features/kpi/pages/KPIDashboardPage"
import { AICopilotPage } from "./features/copilot/pages/AICopilotPage"
import { AnalyticsCenterPage } from "./features/analytics/pages/AnalyticsCenterPage"
import { SettingsPage } from "./features/admin/pages/SettingsPage"
import { PerformancePage } from "./features/performance/pages/PerformancePage"

import { AuthLayout } from "./features/auth/pages/AuthLayout"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { ForgotPasswordPage } from "./features/auth/pages/ForgotPasswordPage"
import { OTPVerificationPage } from "./features/auth/pages/OTPVerificationPage"
import { ResetPasswordPage } from "./features/auth/pages/ResetPasswordPage"

import { CEODashboardPage } from "./features/dashboards/pages/CEODashboardPage"
import { ManagerDashboardPage } from "./features/dashboards/pages/ManagerDashboardPage"
import { SalespersonDashboardPage } from "./features/dashboards/pages/SalespersonDashboardPage"

// newly added pages for UI shell
import { TasksPage, CallsPage, MeetingsPage, VisitsPage, FollowupsPage } from "./features/activities/pages/ActivitiesPages"
import { TeamTargetPage, SalespersonTargetPage } from "./features/targets/pages/TargetsPages"
import { SalespersonScorePage, TeamPerformancePage, IncentivesPage } from "./features/performance/pages/PerformancePages"
import { PipelineAnalyticsPage, ForecastAnalyticsPage, ConversionAnalyticsPage, TerritoryAnalyticsPage, CustomerAnalyticsPage } from "./features/analytics/pages/AnalyticsPages"
import { AIInsightsPage, DealRiskPage, AISalesForecastPage, NextBestActionPage, SalesCoachPage } from "./features/copilot/pages/CopilotPages"
import { UsersListPage, RolesPermissionsPage, TeamsPage, BranchesPage, ProductsPage, TerritoriesAdminPage, SubscriptionBillingPage } from "./features/admin/pages/AdminPages"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/otp-verification" element={<OTPVerificationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* App Routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<CEODashboardPage />} />
              <Route path="/manager" element={<ManagerDashboardPage />} />
              <Route path="/salesperson" element={<SalespersonDashboardPage />} />
              
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/leads/:id" element={<LeadDetailPage />} />
              
              <Route path="/pipeline" element={<PipelinePage />} />
              <Route path="/opportunities" element={<PipelinePage />} />
              <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
              
              <Route path="/customers" element={<CustomerListPage />} />
              <Route path="/contacts" element={<CustomerListPage />} />
              <Route path="/customers/:id" element={<Customer360Page />} />
              
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/targets" element={<TargetDashboardPage />} />
              <Route path="/kpi" element={<KPIDashboardPage />} />
              
              <Route path="/copilot" element={<AICopilotPage />} />
              <Route path="/analytics" element={<AnalyticsCenterPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Activities */}
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calls" element={<CallsPage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/visits" element={<VisitsPage />} />
              <Route path="/followups" element={<FollowupsPage />} />

              {/* Targets */}
              <Route path="/targets/team" element={<TeamTargetPage />} />
              <Route path="/targets/salesperson" element={<SalespersonTargetPage />} />

              {/* Performance */}
              <Route path="/performance/score" element={<SalespersonScorePage />} />
              <Route path="/performance/team" element={<TeamPerformancePage />} />
              <Route path="/performance/incentives" element={<IncentivesPage />} />

              {/* Analytics */}
              <Route path="/analytics/pipeline" element={<PipelineAnalyticsPage />} />
              <Route path="/analytics/forecast" element={<ForecastAnalyticsPage />} />
              <Route path="/analytics/conversion" element={<ConversionAnalyticsPage />} />
              <Route path="/analytics/territory" element={<TerritoryAnalyticsPage />} />
              <Route path="/analytics/customer" element={<CustomerAnalyticsPage />} />

              {/* AI Copilot */}
              <Route path="/copilot/insights" element={<AIInsightsPage />} />
              <Route path="/copilot/risk" element={<DealRiskPage />} />
              <Route path="/copilot/forecast" element={<AISalesForecastPage />} />
              <Route path="/copilot/action" element={<NextBestActionPage />} />
              <Route path="/copilot/coach" element={<SalesCoachPage />} />

              {/* Settings / Admin */}
              <Route path="/settings/users" element={<UsersListPage />} />
              <Route path="/settings/roles" element={<RolesPermissionsPage />} />
              <Route path="/settings/teams" element={<TeamsPage />} />
              <Route path="/settings/branches" element={<BranchesPage />} />
              <Route path="/settings/products" element={<ProductsPage />} />
              <Route path="/settings/territories" element={<TerritoriesAdminPage />} />
              <Route path="/settings/subscription" element={<SubscriptionBillingPage />} />

              {/* Fallback for Unimplemented Routes */}
              <Route path="*" element={<PlaceholderPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
