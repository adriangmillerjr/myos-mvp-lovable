
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Folder, 
  BarChart3, 
  Calendar, 
  FileText, 
  CheckSquare, 
  BookOpen,
  Plus,
  Settings,
  Search,
  MessageSquare,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
}

interface LifeOSSidebarProps {
  projects: Project[];
  onCreateProject: () => void;
  className?: string;
}

export function LifeOSSidebar({ projects, onCreateProject, className }: LifeOSSidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems = [
    { 
      name: "Chat", 
      href: "/dashboard/chat", 
      icon: MessageSquare,
      description: "AI conversation" 
    },
    { 
      name: "Projects", 
      href: "/dashboard/projects", 
      icon: Folder,
      description: "Manage your workspaces" 
    },
    { 
      name: "KPI Dashboard", 
      href: "/dashboard/kpi", 
      icon: BarChart3,
      description: "Track your metrics" 
    },
    { 
      name: "Weekly Report", 
      href: "/dashboard/weekly", 
      icon: Calendar,
      description: "Weekly insights" 
    },
    { 
      name: "Daily Summary", 
      href: "/dashboard/daily", 
      icon: FileText,
      description: "Daily overview" 
    },
    { 
      name: "Master Tasks", 
      href: "/dashboard/tasks", 
      icon: CheckSquare,
      description: "All your tasks" 
    },
    { 
      name: "Journal", 
      href: "/dashboard/journal", 
      icon: BookOpen,
      description: "Personal reflections" 
    },
    { 
      name: "Profile", 
      href: "/dashboard/profile", 
      icon: User,
      description: "Your account settings" 
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("w-80 border-r border-sidebar-border bg-sidebar flex flex-col", className)}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
            </div>
            <h1 className="font-semibold text-sidebar-foreground text-lg">LifeOS.ai</h1>
          </div>
          <Link to="/dashboard/settings">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-sidebar-accent"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent border-sidebar-border focus:ring-2 focus:ring-sidebar-ring h-10"
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {/* Main Navigation */}
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start p-3 h-auto hover:bg-sidebar-accent text-sidebar-foreground",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    )}
                  >
                    <div className="flex items-center space-x-3 flex-1 text-left">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {item.name}
                        </div>
                        <div className="text-xs opacity-60 truncate mt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Projects Section */}
          <div className="pt-6">
            <div className="flex items-center justify-between px-3 pb-3">
              <h3 className="text-sm font-medium text-sidebar-foreground/70">
                Projects
              </h3>
              <Button
                onClick={onCreateProject}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-sidebar-accent"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-1">
              {filteredProjects.map((project) => {
                const isActive = location.pathname === `/dashboard/chat/${project.id}`;
                return (
                  <Link key={project.id} to={`/dashboard/chat/${project.id}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start p-3 h-auto hover:bg-sidebar-accent text-sidebar-foreground",
                        isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      )}
                    >
                      <div className="flex items-center space-x-3 flex-1 text-left">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {project.name}
                          </div>
                          {project.messageCount && (
                            <div className="text-xs opacity-60 mt-1">
                              {project.messageCount} messages
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  </Link>
                );
              })}
              
              {filteredProjects.length === 0 && searchQuery && (
                <div className="px-3 py-2 text-sm text-sidebar-foreground/50">
                  No projects found
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
