import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "./ChatMessage";
import { ModelSelector } from "./ModelSelector";
import { VoiceInput } from "./VoiceInput";
import { ProjectSidebar } from "./ProjectSidebar";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agent_id?: string;
}

type Model = 'gpt-4o' | 'gpt-4' | 'gpt-3.5-turbo';

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
}

interface ChatInterfaceProps {
  projectId?: string;
  userId: string;
  userProfile: any;
  projects: Project[];
  onCreateProject: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  projectId: initialProjectId, 
  userId, 
  userProfile, 
  projects,
  onCreateProject 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>('gpt-4o');
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(initialProjectId);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, [currentProjectId]);

  useEffect(() => {
    setCurrentProjectId(initialProjectId);
  }, [initialProjectId]);

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
        .eq('project_id', currentProjectId || null)
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
    setIsStreaming(true);

    try {
      // Save user message to database
      await supabase.from('chat_messages').insert({
        user_id: userId,
        project_id: currentProjectId || null,
        role: 'user',
        content: userMessage.content
      });

      // Enhanced system prompt with context
      const contextualPrompt = generateContextualPrompt(userProfile, currentProjectId, projects);
      
      // Simulate streaming response
      await simulateStreamingResponse(userMessage.content, contextualPrompt);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const simulateStreamingResponse = async (userInput: string, systemPrompt: string) => {
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateContextualResponse(userInput, userProfile, currentProjectId, projects),
      timestamp: new Date(),
      agent_id: `LifeOS_${selectedModel}`
    };

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Save AI response to database
    await supabase.from('chat_messages').insert({
      user_id: userId,
      project_id: currentProjectId || null,
      role: 'assistant',
      content: aiResponse.content,
      agent_id: aiResponse.agent_id
    });

    setMessages(prev => [...prev, aiResponse]);
  };

  const generateContextualResponse = (input: string, profile: any, projectId?: string, projects?: Project[]) => {
    const currentProject = projects?.find(p => p.id === projectId);
    const projectContext = currentProject ? `in your "${currentProject.name}" project` : "in your global workspace";
    
    return `Working ${projectContext}, I understand you're focused on: "${input}"

Based on your LifeOS profile:
- Vision: ${profile?.mount_everest?.vision_statement || 'Not yet defined'}
- Core Values: ${profile?.non_negotiable_values?.join(', ') || 'Not specified'}
- Current Role: ${profile?.role || 'Professional'}

Let me apply the CTRL + AI + DEL framework:

**CTRL** - What's in your direct control today regarding this task?
**AI** - What aspects can you automate or systematize?
**DEL** - What can you delegate or eliminate entirely?

How does this align with your Mount Everest vision? What's the next highest-value action you can take?`;
  };

  const generateContextualPrompt = (profile: any, projectId?: string, projects?: Project[]) => {
    const currentProject = projects?.find(p => p.id === projectId);
    const projectContext = currentProject ? ` working on "${currentProject.name}"` : ' in global context';
    
    return `You are LifeOS.ai, an AI-powered productivity operating system. 
User: ${profile?.user_name}${projectContext}
Model: ${selectedModel}
Everest Vision: "${profile?.mount_everest?.vision_statement || 'Undefined'}"
Core Values: ${profile?.non_negotiable_values?.join(', ') || 'Not specified'}
Tone: ${profile?.tone || 'Professional and direct'}

Apply the CTRL + AI + DEL framework and guide toward action and alignment.`;
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript);
  };

  const handleProjectSelect = (projectId: string | undefined) => {
    setCurrentProjectId(projectId);
    // Navigate to the appropriate chat route
    const newPath = projectId ? `/dashboard/chat/${projectId}` : '/dashboard/chat';
    window.history.pushState({}, '', newPath);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentProject = projects.find(p => p.id === currentProjectId);

  return (
    <div className="flex h-full bg-background">
      {/* Project Sidebar */}
      <ProjectSidebar
        projects={projects}
        selectedProjectId={currentProjectId}
        onProjectSelect={handleProjectSelect}
        onCreateProject={onCreateProject}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {currentProject ? currentProject.name : 'Chat'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    AI-powered clarity and productivity guidance
                  </p>
                </div>
              </div>
            </div>
            
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  How can I help you today?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start a conversation to unlock clarity and accelerate your progress.
                </p>
                <div className="text-sm text-muted-foreground">
                  Powered by {selectedModel} • Context-aware responses
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 max-w-3xl">
                  <div className="rounded-lg px-4 py-3 bg-chat-assistant border border-border shadow-soft">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 items-end">
              <div className="flex-1 min-w-0">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message LifeOS.ai..."
                  disabled={isLoading}
                  className="min-h-[44px] resize-none border-border bg-background"
                />
              </div>
              
              <VoiceInput
                onTranscript={handleVoiceTranscript}
                disabled={isLoading}
              />
              
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !input.trim()}
                size="icon"
                className="w-11 h-11"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>
                Press Enter to send • Context: {currentProject ? `${currentProject.name} project` : 'Global workspace'}
              </span>
              {isStreaming && (
                <span className="text-primary">Generating response...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
