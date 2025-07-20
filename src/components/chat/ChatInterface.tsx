
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

interface ChatInterfaceProps {
  currentAgent?: {
    id: string;
    name: string;
    description: string;
    systemPrompt: string;
  };
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export function ChatInterface({ 
  currentAgent, 
  messages, 
  onSendMessage, 
  isLoading = false 
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Clean Chat Header */}
      {currentAgent && (
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface/30">
          <div>
            <h2 className="font-semibold text-foreground text-lg">{currentAgent.name}</h2>
            <p className="text-sm text-muted-foreground">{currentAgent.description}</p>
          </div>
        </div>
      )}
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-foreground rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {currentAgent ? `Start chatting with ${currentAgent.name}` : 'Welcome to LifeOS.ai'}
              </h3>
              <p className="text-muted-foreground">
                Your personalized AI productivity assistant is ready to help.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex items-center space-x-3 p-4 bg-chat-assistant rounded-lg border border-border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Clean Input Area */}
      <div className="border-t border-border bg-surface/30 p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative flex items-end space-x-3">
            <div className="flex-1 min-h-[48px] max-h-32 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentAgent ? `Message ${currentAgent.name}...` : "Message LifeOS.ai..."}
                className="min-h-[48px] max-h-32 resize-none pr-12 bg-background border-border focus:ring-2 focus:ring-ring text-base"
                rows={1}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-accent"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-12 w-12 p-0 hover:bg-accent"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 p-0 bg-foreground hover:bg-foreground/90 text-background"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
