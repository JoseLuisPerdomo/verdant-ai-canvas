import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end gap-2 p-4 bg-gradient-subtle border-t border-border rounded-lg shadow-elegant">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            className={cn(
              "min-h-[44px] max-h-32 resize-none border-0 bg-background/60 backdrop-blur-sm",
              "focus:ring-2 focus:ring-primary/20 focus:border-transparent",
              "placeholder:text-muted-foreground"
            )}
          />
        </div>
        
        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || disabled}
          className={cn(
            "h-10 w-10 p-0 bg-gradient-primary hover:opacity-90 transition-all",
            "shadow-chat hover:shadow-elegant disabled:opacity-50"
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};