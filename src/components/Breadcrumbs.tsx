import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const location = useLocation()
  const paths = location.pathname.split("/").filter((path) => path)

  if (paths.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground ml-4">
      <Link to="/" className="hover:text-foreground transition-colors flex items-center">
        <Home className="h-4 w-4" />
      </Link>
      
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join("/")}`
        const isLast = index === paths.length - 1
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")

        return (
          <div key={path} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4 shrink-0" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {label}
              </span>
            ) : (
              <Link to={routeTo} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
