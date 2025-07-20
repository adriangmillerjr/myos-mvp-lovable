
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LifeOSSidebar } from "@/components/dashboard/LifeOSSidebar";
import { OnboardingFlow } from "@/components/auth/OnboardingFlow";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  color: string;
  messageCount?: number;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const isChat = window.location.pathname.includes('/chat');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        navigate('/auth');
        return;
      }

      setUser(user);

      // Check if user has completed onboarding
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
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
      console.error('Auth check error:', error);
      navigate('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error("Failed to load projects");
    }
  };

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await checkUser(); // Reload user data
    navigate('/dashboard/projects');
  };

  const handleCreateProject = async () => {
    const projectName = prompt("Enter project name:");
    if (!projectName || !user) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: projectName,
          description: `${projectName} project workspace`,
          color: '#6366F1'
        })
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => [data, ...prev]);
      navigate(`/dashboard/chat/${data.id}`);
      toast.success("Project created successfully!");
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error("Failed to create project");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-full mx-auto animate-pulse"></div>
          <p className="text-muted-foreground">Loading LifeOS.ai...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <LifeOSSidebar 
        projects={projects}
        onCreateProject={handleCreateProject}
      />
      
      <main className="flex-1 overflow-hidden">
        {isChat && user && profile ? (
          <ChatInterface 
            projectId={params.projectId} 
            userId={user.id}
            userProfile={profile}
          />
        ) : (
          <Outlet context={{ profile, projects }} />
        )}
      </main>
    </div>
  );
}
