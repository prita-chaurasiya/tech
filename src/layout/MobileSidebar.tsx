import { NavLink, useNavigate } from "react-router-dom"
import { Bot, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { navGroups } from "@/config/nav"
import { cn } from "@/lib/utils"

export function MobileSidebar({ onNavigate }: { onNavigate: () => void }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border/50 shrink-0 gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot size={20} className="text-primary" />
        </div>
        <span className="font-bold text-lg tracking-tight">AI Sales OS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-1">
            <div className="px-3 mb-1 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              {group.label}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium shadow-sm" 
                      : "text-sidebar-foreground/80"
                  )
                }
              >
                <item.icon size={18} className="shrink-0" />
                <span className="whitespace-nowrap">{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border/50 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-background shadow-sm shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary font-bold">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate">Jane Doe</span>
              <span className="text-xs text-muted-foreground truncate">CEO</span>
            </div>
            <button 
              onClick={() => {
                onNavigate()
                navigate("/login")
              }} 
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
