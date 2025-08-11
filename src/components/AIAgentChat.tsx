import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export const AIAgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great point! Based on my analysis, I'd suggest...",
        "Thank you for that information. Let me process this and provide you with a comprehensive response.",
        "I can definitely help you with that. Let me break this down for you..."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "Message received",
        description: "AI Assistant has responded to your message.",
      });
    }, 1500 + Math.random() * 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI Assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "Conversation has been reset.",
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Sofia</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearChat}
          className="gap-2 hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 pt-0">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};