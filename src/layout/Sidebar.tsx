import { NavLink, useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  Bot,
  Menu,
  LogOut
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { navGroups } from "@/config/nav"
import { toast } from "sonner"

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, user } = useAppStore()
  const navigate = useNavigate()

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 hidden md:flex flex-col relative z-20 shrink-0",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/50 shrink-0">
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot size={20} className="text-primary" />
            </div>
            <span className="font-bold text-lg whitespace-nowrap tracking-tight">AI Sales OS</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1.5 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground transition-colors ml-auto"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-1">
            {isSidebarOpen && (
              <div className="px-3 mb-1 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                {group.label}
              </div>
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium shadow-sm" 
                      : "text-sidebar-foreground/80",
                    !isSidebarOpen && "justify-center"
                  )
                }
              >
                <item.icon size={18} className="shrink-0" />
                {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border/50 shrink-0 mt-auto">
        <button 
          onClick={() => {
            useAppStore.getState().setAuthenticated(false)
            toast.success("Logged out successfully.")
            navigate("/login")
          }}
          className={cn(
            "w-full flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-sidebar-accent group text-left",
            !isSidebarOpen && "justify-center"
          )}
        >
          <Avatar className="h-9 w-9 border-2 border-background shadow-sm shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate group-hover:text-sidebar-accent-foreground">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground truncate group-hover:text-sidebar-accent-foreground/80">{user?.role || "Member"}</span>
              </div>
              <LogOut size={18} className="text-muted-foreground group-hover:text-sidebar-accent-foreground transition-colors" />
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
