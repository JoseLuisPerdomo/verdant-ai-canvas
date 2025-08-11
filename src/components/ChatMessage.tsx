import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8 shadow-chat">
        <AvatarFallback 
          className={cn(
            "text-xs font-medium",
            isUser 
              ? "bg-secondary text-secondary-foreground" 
              : "bg-primary text-primary-foreground"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-chat transition-all duration-300 hover:shadow-elegant",
            isUser
              ? "bg-user-bg border border-secondary/20"
              : "bg-ai-bg border border-primary/20"
          )}
        >
          <p className="text-sm leading-relaxed text-foreground">{message}</p>
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};