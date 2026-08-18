import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export function PlaceholderPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center border-dashed">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Construction className="text-primary w-6 h-6" />
          </div>
          <CardTitle>Page Under Construction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This module is part of the AI Sales OS implementation plan but has not been fully built out yet. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
