import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Orbit, ArrowRight, Mail, Lock, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useAppStore } from "@/store/useAppStore"

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const { setAuthenticated, setUser } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const { registeredUsers, registerUser } = useAppStore.getState()
      
      if (registeredUsers.find(u => u.email === data.email)) {
        toast.error("An account with this email already exists.")
        return
      }

      registerUser({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        role: "Manager",
        password: data.password,
      })

      toast.success("Account created successfully. Please sign in.")
      navigate("/login")
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                className={`pl-10 h-11 bg-background ${errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                disabled={isLoading}
                {...register("firstName")}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
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
                className={`pl-10 h-11 bg-background ${errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                disabled={isLoading}
                {...register("lastName")}
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
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
              className={`pl-10 h-11 bg-background ${errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              disabled={isLoading}
              {...register("company")}
            />
          </div>
          {errors.company && (
            <p className="text-sm text-destructive">{errors.company.message}</p>
          )}
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
          <Label htmlFor="password">Password</Label>
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
