import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Orbit, ArrowRight, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useAppStore } from "@/store/useAppStore"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { setAuthenticated, setUser } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const { registeredUsers } = useAppStore.getState()
      const user = registeredUsers.find(u => u.email === data.email)

      if (!user) {
        toast.error("No account found with this email. Please sign up.")
        return
      }

      if (user.password !== data.password) {
        toast.error("Invalid email or password.")
        return
      }

      toast.success("Successfully logged in.")
      setAuthenticated(true)
      setUser(user)
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
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail size={16} />
            </div>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              className={`pl-10 h-11 bg-background ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={16} />
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className={`pl-10 h-11 bg-background ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11 text-base font-medium mt-6 group/btn" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
          {!isLoading && <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link to="/register" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </>
  )
}
