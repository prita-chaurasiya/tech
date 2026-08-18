import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Orbit, ArrowRight, ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordFormValues) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Password has been successfully reset.")
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
        <h1 className="text-3xl font-semibold tracking-tight">Set new password</h1>
        <p className="text-sm text-muted-foreground">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={16} />
            </div>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              className={`pl-10 h-11 bg-background ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              disabled={isLoading}
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11 text-base font-medium mt-6 group/btn" disabled={isLoading}>
          {isLoading ? "Resetting password..." : "Reset password"}
          {!isLoading && <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <Link to="/login" className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to log in
        </Link>
      </div>
    </>
  )
}
