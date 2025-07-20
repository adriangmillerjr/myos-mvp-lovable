import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AgentSidebar } from "@/components/chat/AgentSidebar";

// Mock data - this will be replaced with Supabase data
const mockFolders = [
  {
    id: "clarity-os",
    name: "ClarityOS",
    description: "Personal clarity and vision tools",
    color: "#8b5cf6",
    agents: [
      {
        id: "clarity-gpt",
        name: "ClarityOS__GPT",
        description: "Life mission and vision clarity",
        folderId: "clarity-os",
        systemPrompt: "You are ClarityOS__GPT, focused on helping users clarify their life mission, Mount Everest vision, and core values.",
        icon: "🎯"
      },
      {
        id: "values-advisor",
        name: "ValuesAdvisor",
        description: "Core values alignment coach",
        folderId: "clarity-os",
        systemPrompt: "You help users identify, clarify, and align their actions with their core values.",
        icon: "⚡"
      }
    ]
  },
  {
    id: "work-os",
    name: "WorkOS",
    description: "Productivity and task management",
    color: "#06b6d4",
    agents: [
      {
        id: "task-master",
        name: "TaskMaster",
        description: "Task prioritization and management",
        folderId: "work-os",
        systemPrompt: "You are TaskMaster, specialized in helping users prioritize tasks, manage workflows, and optimize productivity.",
        icon: "📋"
      },
      {
        id: "focus-coach",
        name: "FocusCoach",
        description: "Deep work and concentration assistant",
        folderId: "work-os",
        systemPrompt: "You help users achieve deep focus, eliminate distractions, and maintain sustained concentration.",
        icon: "🎯"
      }
    ]
  },
  {
    id: "advisor-mode",
    name: "Strategy Advisors",
    description: "High-level strategic guidance",
    color: "#f59e0b",
    agents: [
      {
        id: "advisor-gpt-sage",
        name: "AdvisorGPT__Sage",
        description: "Wise strategic counsel",
        folderId: "advisor-mode",
        systemPrompt: "You are AdvisorGPT__Sage, providing wise, strategic counsel with the wisdom of ages. You think long-term and help users see the bigger picture.",
        icon: "🧙‍♂️"
      },
      {
        id: "decision-architect",
        name: "DecisionArchitect",
        description: "Complex decision-making support",
        folderId: "advisor-mode",
        systemPrompt: "You help users architect complex decisions by breaking them down systematically and considering all angles.",
        icon: "🏗️"
      }
    ]
  }
];

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  folderId: string;
  systemPrompt: string;
  icon?: string;
}

export default function Chat() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(mockFolders[0].agents[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a system message when agent changes
  useEffect(() => {
    if (selectedAgent) {
      setMessages([
        {
          id: `system-${selectedAgent.id}`,
          role: 'system',
          content: `${selectedAgent.name} is now active. This agent specializes in: ${selectedAgent.description}`,
          timestamp: new Date(),
          agentId: selectedAgent.id
        }
      ]);
    }
  }, [selectedAgent.id]);

  const handleSendMessage = async (content: string) => {
    if (!selectedAgent) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      agentId: selectedAgent.id
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I'm ${selectedAgent.name}. ${selectedAgent.description}. You said: "${content}". Here's my response based on my specialized knowledge and your personal profile (which will be injected from Supabase once connected).`,
        timestamp: new Date(),
        agentId: selectedAgent.id
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      <AgentSidebar
        folders={mockFolders}
        selectedAgentId={selectedAgent?.id}
        onSelectAgent={setSelectedAgent}
        onCreateAgent={() => {
          // TODO: Open agent creation modal
          console.log("Create new agent");
        }}
      />
      
      <div className="flex-1">
        <ChatInterface
          currentAgent={selectedAgent}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}