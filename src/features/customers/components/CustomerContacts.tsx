import { Contact } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, Star } from "lucide-react"

export function CustomerContacts({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map(contact => (
        <Card key={contact.id} className="relative overflow-hidden group">
          {contact.isPrimary && (
            <div className="absolute top-0 right-0">
              <div className="w-16 h-16 bg-primary/10 flex items-start justify-end p-2 -mr-8 -mt-8 rotate-45 transform origin-bottom-left">
                <Star size={12} className="text-primary fill-primary -rotate-45" />
              </div>
            </div>
          )}
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarFallback className="bg-accent/10 text-accent">
                  {contact.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-lg truncate">{contact.name}</h4>
                  {contact.isPrimary && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Primary</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit">
                    <Mail size={14} /> <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit">
                    <Phone size={14} /> <span>{contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
