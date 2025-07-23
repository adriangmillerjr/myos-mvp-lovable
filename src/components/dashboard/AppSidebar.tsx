
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
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
}

interface AppSidebarProps {
  projects: Project[];
  onCreateProject: () => void;
}

export function AppSidebar({ projects, onCreateProject }: AppSidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useSidebar();

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

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
            </div>
            {!isCollapsed && (
              <h1 className="font-semibold text-sidebar-foreground text-lg">MyOS AI</h1>
            )}
          </div>
          {!isCollapsed && (
            <Link to="/dashboard/settings">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-sidebar-accent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-sidebar-accent border-sidebar-border focus:ring-2 focus:ring-sidebar-ring h-10"
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? item.name : undefined}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Projects</span>
            {!isCollapsed && (
              <Button
                onClick={onCreateProject}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-sidebar-accent"
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredProjects.map((project) => {
                const isActive = location.pathname === `/dashboard/chat/${project.id}`;
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? project.name : undefined}
                    >
                      <Link to={`/dashboard/chat/${project.id}`}>
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {filteredProjects.length === 0 && searchQuery && !isCollapsed && (
                <div className="px-2 py-1 text-sm text-sidebar-foreground/50">
                  No projects found
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
