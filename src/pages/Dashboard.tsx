// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { OnboardingFlow } from "@/components/auth/OnboardingFlow";
import { ChatInterface, type Message } from "@/components/chat/ChatInterface";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
  updated_at?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const isChat = window.location.pathname.includes("/chat");

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        navigate("/auth");
        return;
      }
      setUser(user);

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Profile fetch error:", profileError);
        toast.error("Failed to load profile");
        return;
      }

      if (!profile || !profile.onboarding_completed) {
        setShowOnboarding(true);
      } else {
        setProfile(profile);
        await loadProjects(user.id);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects");
    }
  };

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await checkUser();
    navigate("/dashboard/projects");
  };

  const handleCreateProject = async () => {
    const projectName = prompt("Enter project name:");
    if (!projectName || !user) return;

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: projectName,
          description: `${projectName} project workspace`,
          color: "#6366F1",
        })
        .select()
        .single();

      if (error) throw error;

      setProjects((prev) => [data, ...prev]);
      navigate(`/dashboard/chat/${data.id}`);
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  };

  // ---- ChatInterface wiring ----
  const activeProjectId = params.projectId as string | undefined;

  const chats = projects.map((p) => ({
    id: p.id,
    name: p.name,
    color: p.color,
  }));

  const handleSelectChat = (id?: string) => {
    if (!id) return;
    navigate(`/dashboard/chat/${id}`);
  };

  const handleClearChat = () => {
    // implement your own conversation reset if you store messages in DB
    toast.message("Cleared (UI only). Wire this to your message store if needed.");
  };

  async function onSend(content: string): Promise<Message> {
    // Call your secure serverless proxy
    const r = await fetch("/api/agent-proxy", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        prompt: content,
        projectId: activeProjectId ?? "no-project",
        userId: user?.id ?? "anon",
      }),
    });

    const text = await r.text();
    console.log("proxy status", r.status, "body:", text); // visible in devtools

    let reply = text;
    try {
      const json = JSON.parse(text);
      reply = json.reply ?? text;
    } catch {
      // plain text is fine
    }

    return {
      id: String(Date.now()),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString(),
    };
  }
  // -------------------------------

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-full mx-auto animate-pulse"></div>
          <p className="text-muted-foreground">Loading MyOS AI...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar projects={projects} onCreateProject={handleCreateProject} />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 px-4">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
              </div>
              <span className="font-semibold">MyOS AI</span>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            {isChat && user && profile ? (
              <ChatInterface
                userName={profile?.full_name || user?.email || "You"}
                onNewChat={handleCreateProject}
                onClearChat={handleClearChat}
                onSend={onSend}                  // 👈 wired to backend now
                chats={chats}
                onSelectChat={handleSelectChat}
                activeChatId={activeProjectId}
              />
            ) : (
              <Outlet context={{ profile, projects }} />
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
