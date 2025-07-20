import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, MessageSquare, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
}

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId?: string;
  onProjectSelect: (projectId: string | undefined) => void;
  onCreateProject: () => void;
  className?: string;
}

export function ProjectSidebar({ 
  projects, 
  selectedProjectId, 
  onProjectSelect, 
  onCreateProject,
  className 
}: ProjectSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("w-64 border-r border-border bg-background flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">LifeOS Chat</h2>
          <Button
            size="icon"
            variant="outline"
            onClick={onCreateProject}
            className="w-8 h-8"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Global Chat */}
          <Card 
            className={cn(
              "p-3 mb-2 cursor-pointer transition-colors hover:bg-accent border-border",
              !selectedProjectId && "bg-accent border-primary"
            )}
            onClick={() => onProjectSelect(undefined)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground truncate">
                  Global Chat
                </h3>
                <p className="text-xs text-muted-foreground">
                  General assistance
                </p>
              </div>
            </div>
          </Card>

          {/* Project List */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={cn(
                    "p-3 cursor-pointer transition-colors hover:bg-accent border-border",
                    selectedProjectId === project.id && "bg-accent border-primary"
                  )}
                  onClick={() => onProjectSelect(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <Folder 
                        className="w-4 h-4" 
                        style={{ color: project.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {project.messageCount ? `${project.messageCount} messages` : 'No messages'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No projects found</p>
            </div>
          )}

          {projects.length === 0 && (
            <div className="text-center py-8">
              <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">No projects yet</p>
              <Button
                size="sm"
                onClick={onCreateProject}
                className="w-full"
              >
                Create your first project
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}