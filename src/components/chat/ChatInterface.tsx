import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agent_id?: string;
}

interface ChatInterfaceProps {
  projectId?: string;
  userId: string;
  userProfile: any;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ projectId, userId, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, [projectId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .eq('project_id', projectId || null)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data?.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
        timestamp: new Date(msg.created_at),
        agent_id: msg.agent_id
      })) || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to database
      await supabase.from('chat_messages').insert({
        user_id: userId,
        project_id: projectId || null,
        role: 'user',
        content: userMessage.content
      });

      // CTRL + AI + DEL reset protocol
      const systemPrompt = generateSystemPrompt(userProfile);
      
      // Simulate AI response (replace with actual OpenAI integration)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're working on: "${userMessage.content}"\n\nLet me help you with the CTRL + AI + DEL framework:\n\n**CTRL** - What's in your control today?\n**AI** - What can you offload or automate?\n**DEL** - What can you delegate or remove?\n\nBased on your Mount Everest vision: "${userProfile?.mount_everest?.vision_statement}", how does this align with your core objectives?`,
        timestamp: new Date(),
        agent_id: 'ClarityOS__GPT'
      };

      // Save AI response to database
      await supabase.from('chat_messages').insert({
        user_id: userId,
        project_id: projectId || null,
        role: 'assistant',
        content: aiResponse.content,
        agent_id: aiResponse.agent_id
      });

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSystemPrompt = (profile: any) => {
    return `You are the AI core of LifeOS.ai. Your user is ${profile?.user_name}. Their Everest vision is: "${profile?.mount_everest?.vision_statement}". Their core values: ${profile?.non_negotiable_values?.join(', ')}.

Begin every session with the CTRL + AI + DEL reset:
CTRL — What's in their control today?
AI — What can they offload or automate?
DEL — What can they delegate or remove?

Guide them toward action and alignment. Summarize task state, spot blockers, and auto-route logic through agents as needed.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">LifeOS Chat</h2>
        <p className="text-sm text-muted-foreground">AI-powered clarity and productivity guidance</p>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <Card className="p-6 text-center">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to LifeOS.ai</h3>
              <p className="text-muted-foreground">Start a conversation to begin your clarity-first productivity journey</p>
            </Card>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card className={`max-w-[70%] p-3 ${
                message.role === 'user' 
                  ? 'bg-chat-user text-primary-foreground' 
                  : 'bg-chat-assistant'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>

              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-3 bg-chat-assistant">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};