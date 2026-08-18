import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Orbit, ArrowRight, Mail, Lock, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate register API call
    setTimeout(() => {
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center md:text-left mb-8">
        <div className="flex items-center justify-center md:hidden gap-2 mb-6 text-foreground">
          <div className="bg-primary p-2 rounded-xl">
            <Orbit size={24} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Antigravity<span className="text-primary">OS</span></span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={16} />
              </div>
              <Input 
                id="firstName" 
                placeholder="John" 
                required 
                className="pl-10 h-11 bg-background"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={16} />
              </div>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                required 
                className="pl-10 h-11 bg-background"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Building size={16} />
            </div>
            <Input 
              id="company" 
              placeholder="Acme Inc." 
              required 
              className="pl-10 h-11 bg-background"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail size={16} />
            </div>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              required 
              className="pl-10 h-11 bg-background"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={16} />
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="pl-10 h-11 bg-background"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" className="w-full h-11 text-base font-medium mt-6 group/btn" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
          {!isLoading && <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </>
  )
}
