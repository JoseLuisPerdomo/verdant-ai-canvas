import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquarePlus, Trash2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ConversationSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ConversationSidebar = ({ 
  isOpen, 
  onToggle, 
  currentConversationId, 
  onSelectConversation,
  onNewConversation 
}: ConversationSidebarProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Consulta sobre medicamentos",
      lastMessage: "¿Cuál es la dosis recomendada?",
      timestamp: "10:30"
    },
    {
      id: "2", 
      title: "Horarios de la farmacia",
      lastMessage: "¿Están abiertos los domingos?",
      timestamp: "09:15"
    }
  ]);

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
        "w-80",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0",
        !isOpen && "md:-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="font-semibold text-sidebar-foreground">Conversaciones</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* New Conversation Button */}
        <div className="p-4">
          <Button
            onClick={onNewConversation}
            className="w-full gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Nueva Conversación
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "group relative p-3 rounded-lg cursor-pointer transition-colors duration-200",
                  "hover:bg-sidebar-accent",
                  currentConversationId === conversation.id 
                    ? "bg-sidebar-accent border border-sidebar-primary/20" 
                    : "border border-transparent"
                )}
              >
                <div className="pr-8">
                  <h3 className="font-medium text-sm text-sidebar-foreground truncate">
                    {conversation.title}
                  </h3>
                  <p className="text-xs text-sidebar-foreground/70 mt-1 truncate">
                    {conversation.lastMessage}
                  </p>
                  <span className="text-xs text-sidebar-foreground/50 mt-1 block">
                    {conversation.timestamp}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => deleteConversation(conversation.id, e)}
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 h-10 w-10 bg-background shadow-elegant border-border hover:bg-accent"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};