import { Outlet } from "react-router-dom"
import { Orbit } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left side: branding/showcase */}
      <div className="hidden md:flex md:w-1/2 bg-zinc-950 p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[100px]" />
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Orbit size={28} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Antigravity<span className="text-primary">OS</span></span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg mt-20">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
            The intelligent operating system for modern revenue teams.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Unify your customer data, accelerate your pipeline, and close deals faster with AI-driven insights that matter.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-zinc-500 mt-20">
          <span>© 2026 Antigravity Inc.</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right side: form area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 relative bg-background">
        <div className="w-full max-w-md space-y-8 relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
