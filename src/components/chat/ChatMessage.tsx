
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  return (
    <div className={cn(
      "flex gap-4 group",
      isUser && "flex-row-reverse"
    )}>
      {/* Clean Avatar */}
      <Avatar className="h-10 w-10 mt-1 border border-border">
        <AvatarFallback className={cn(
          "text-sm font-medium",
          isUser && "bg-chat-user text-primary-foreground",
          !isUser && !isSystem && "bg-chat-assistant text-foreground",
          isSystem && "bg-chat-system text-foreground"
        )}>
          {isUser ? (
            <User className="h-4 w-4" />
          ) : isSystem ? (
            <Settings className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn(
        "flex-1 max-w-3xl",
        isUser && "flex flex-col items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-3 text-sm leading-relaxed shadow-soft border border-border",
          isUser && "bg-chat-user text-primary-foreground ml-12",
          !isUser && !isSystem && "bg-chat-assistant text-foreground mr-12",
          isSystem && "bg-chat-system text-foreground mr-12"
        )}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
        
        {/* Clean Timestamp */}
        <div className={cn(
          "text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
          isUser && "text-right"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
