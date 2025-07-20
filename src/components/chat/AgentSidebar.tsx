import { useState } from "react";
import { Bot, Folder, Plus, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  description: string;
  folderId: string;
  systemPrompt: string;
  icon?: string;
}

interface AgentFolder {
  id: string;
  name: string;
  description?: string;
  color?: string;
  agents: Agent[];
}

interface AgentSidebarProps {
  folders: AgentFolder[];
  selectedAgentId?: string;
  onSelectAgent: (agent: Agent) => void;
  onCreateAgent?: () => void;
  className?: string;
}

export function AgentSidebar({ 
  folders, 
  selectedAgentId, 
  onSelectAgent, 
  onCreateAgent,
  className 
}: AgentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(folders.map(f => f.id))
  );

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const filteredFolders = folders.map(folder => ({
    ...folder,
    agents: folder.agents.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(folder => folder.agents.length > 0 || searchQuery === "");

  return (
    <div className={cn("w-80 border-r bg-sidebar flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sidebar-foreground">AI Agents</h2>
          {onCreateAgent && (
            <Button
              onClick={onCreateAgent}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/60" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-sidebar-accent border-sidebar-border focus:ring-sidebar-primary"
          />
        </div>
      </div>

      {/* Agent Folders */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFolders.map((folder) => (
            <div key={folder.id} className="mb-2">
              {/* Folder Header */}
              <Button
                variant="ghost"
                onClick={() => toggleFolder(folder.id)}
                className="w-full justify-start p-2 h-auto hover:bg-sidebar-accent text-sidebar-foreground"
              >
                <div className="flex items-center space-x-2 flex-1">
                  {expandedFolders.has(folder.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <Folder className="h-4 w-4" style={{ color: folder.color }} />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{folder.name}</div>
                    {folder.description && (
                      <div className="text-xs text-sidebar-foreground/60">
                        {folder.description}
                      </div>
                    )}
                  </div>
                  <span className="text-xs bg-sidebar-accent px-2 py-1 rounded">
                    {folder.agents.length}
                  </span>
                </div>
              </Button>

              {/* Agents in Folder */}
              {expandedFolders.has(folder.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {folder.agents.map((agent) => (
                    <Button
                      key={agent.id}
                      variant="ghost"
                      onClick={() => onSelectAgent(agent)}
                      className={cn(
                        "w-full justify-start p-2 h-auto hover:bg-sidebar-accent text-sidebar-foreground",
                        selectedAgentId === agent.id && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      )}
                    >
                      <div className="flex items-center space-x-3 flex-1 text-left">
                        <div className="flex-shrink-0">
                          {agent.icon ? (
                            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center text-xs">
                              {agent.icon}
                            </div>
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {agent.name}
                          </div>
                          <div className="text-xs opacity-70 truncate">
                            {agent.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}