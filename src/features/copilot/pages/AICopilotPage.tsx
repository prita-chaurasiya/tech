import { useState, useRef, useEffect } from "react"
import { mockCopilotSession, SUGGESTED_PROMPTS, QUICK_ACTIONS } from "../data/mockData"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Mic, FileText, Mail, MessageSquare, Video, ArrowRight, Zap, Target, TrendingUp, Building2, ExternalLink } from "lucide-react"

export function AICopilotPage() {
  const [messages, setMessages] = useState(mockCopilotSession.messages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, newMsg])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I've analyzed that request. Here's a customized draft based on the Acme Corp deal history and recent KPI trends. The primary risk is pricing, so I emphasized ROI.",
        timestamp: new Date().toISOString(),
        suggestedActions: ["Send Email", "Schedule Meeting"],
        contextData: [
          { type: "Deal", id: "D1", name: "Acme Corp Expansion", summary: "$1.2M • Negotiation", url: "/pipeline" }
        ] as any
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail": return <Mail size={16} />
      case "MessageSquare": return <MessageSquare size={16} />
      case "FileText": return <FileText size={16} />
      case "Video": return <Video size={16} />
      default: return <Zap size={16} />
    }
  }

  const getContextIcon = (type: string) => {
    switch (type) {
      case "Deal": return <Target size={14} className="text-primary" />
      case "KPI": return <TrendingUp size={14} className="text-emerald-500" />
      case "Customer": return <Building2 size={14} className="text-blue-500" />
      default: return <Zap size={14} />
    }
  }

  return (
    <div className="flex h-full gap-6">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden relative">
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-sm">AI Sales Copilot</h2>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs hidden md:flex">Clear Chat</Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <Bot size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">How can I help you sell today?</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                I can analyze pipeline risk, summarize deals, draft emails, or forecast revenue.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 shrink-0 border">
                  {msg.role === "assistant" ? (
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={16} /></AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-muted text-muted-foreground">ME</AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div 
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 border rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Context Cards */}
                  {msg.contextData && msg.contextData.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {msg.contextData.map((ctx) => (
                        <div key={ctx.id} className="flex items-center gap-2 bg-background border shadow-sm rounded-lg p-2 pr-3 text-xs hover:border-primary/50 cursor-pointer transition-colors group">
                          <div className="p-1.5 bg-muted rounded-md group-hover:bg-primary/10 transition-colors">
                            {getContextIcon(ctx.type)}
                          </div>
                          <div>
                            <div className="font-semibold">{ctx.name}</div>
                            <div className="text-[10px] text-muted-foreground">{ctx.summary}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {msg.suggestedActions.map((action, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer border-transparent px-3 py-1 text-xs"
                        >
                          <Zap size={10} className="mr-1.5" /> {action}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex gap-4">
              <Avatar className="h-8 w-8 shrink-0 border">
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-muted/50 border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t">
          {/* Suggested Prompts (Scrollable horizontal) */}
          {messages.length === 0 && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="shrink-0 cursor-pointer hover:bg-accent hover:text-accent-foreground py-1.5 px-3 font-normal"
                  onClick={() => setInputValue(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          )}

          <div className="relative flex items-center">
            <Button variant="ghost" size="icon" className="absolute left-2 text-muted-foreground hover:text-foreground z-10">
              <Mic size={18} />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot anything..."
              className="pl-12 pr-12 py-6 rounded-xl bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 shadow-inner text-base"
            />
            <Button 
              size="icon" 
              className={`absolute right-2 rounded-lg transition-all ${inputValue.trim() ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={16} className={inputValue.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Context Panel (Hidden on mobile) */}
      <div className="hidden xl:flex w-[320px] flex-col gap-4">
        
        <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-yellow-300" />
              <h3 className="font-bold">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action, i) => (
                <Button key={i} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-transparent h-auto py-3 flex flex-col gap-2 justify-center">
                  {getIcon(action.icon)}
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-center leading-tight whitespace-normal">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 overflow-y-auto">
          <div className="p-4 border-b bg-muted/30 sticky top-0 backdrop-blur-sm z-10">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Target size={16} className="text-muted-foreground" /> Current Context
            </h3>
          </div>
          <CardContent className="p-4 space-y-4">
            
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Deals in Chat</div>
              <div className="p-3 bg-muted/30 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors group">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors">Acme Corp</span>
                  <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-muted-foreground mb-2">Enterprise Expansion</div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] bg-background">Negotiation</Badge>
                  <span className="text-xs font-bold">₹9.6L</span>
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg border hover:border-primary/50 cursor-pointer transition-colors group">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors">Globex</span>
                  <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-muted-foreground mb-2">Security Add-on</div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] bg-background text-orange-500 border-orange-200">At Risk</Badge>
                  <span className="text-xs font-bold">₹3.6L</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Insights</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Win rate for enterprise deals in Q3 is currently <strong className="text-foreground">31%</strong>. To hit the ₹50Cr target, focus on moving deals out of the 'Proposal' stage faster.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
