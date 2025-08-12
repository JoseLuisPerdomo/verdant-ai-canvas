import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ConversationSidebar } from "./ConversationSidebar";
import { Button } from "@/components/ui/button";
import { Sparkles, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
      content: "¡Hola! Soy Sofia, tu asistenta virtual. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        "¡Excelente pregunta! Permíteme ayudarte con eso.",
        "Entiendo lo que me preguntas. Esto es lo que pienso...",
        "¡Muy buen punto! Basándome en mi análisis, te sugiero...",
        "Gracias por esa información. Déjame procesar esto y brindarte una respuesta completa.",
        "Definitivamente puedo ayudarte con eso. Permíteme explicártelo paso a paso..."
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
        title: "Mensaje recibido",
        description: "Sofia ha respondido a tu mensaje.",
      });
    }, 1500 + Math.random() * 1000);
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: "1",
        content: "¡Hola! Soy Sofia, tu asistenta virtual. ¿En qué puedo ayudarte hoy?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setCurrentConversationId(Date.now().toString());
    toast({
      title: "Nueva conversación",
      description: "Se ha iniciado una nueva conversación.",
    });
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    // In a real app, you would load the conversation messages here
    setIsSidebarOpen(false);
  };

  const handleAccountClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-full bg-gradient-subtle">
      {/* Conversation Sidebar */}
      <ConversationSidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Sofia</h1>
              <p className="text-sm text-muted-foreground">La mejor asistenta virtual para tu farmacia</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleAccountClick}
            className="gap-2 hover:bg-accent"
          >
            <User className="h-4 w-4" />
            Cuenta
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
    </div>
  );
};