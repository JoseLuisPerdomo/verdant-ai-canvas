import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <Avatar className="h-8 w-8 shadow-chat">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-ai-bg border border-primary/20 rounded-2xl px-4 py-3 shadow-chat">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-typing"></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-typing [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-typing [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};