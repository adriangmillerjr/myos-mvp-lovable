
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Briefcase, Target, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      setProfile(data || {
        user_name: '',
        bio: '',
        role: '',
        industry: '',
        tone: '',
        mount_everest: { vision_statement: '' },
        non_negotiable_values: []
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          user_name: profile.user_name,
          bio: profile.bio,
          role: profile.role,
          industry: profile.industry,
          tone: profile.tone,
          mount_everest: profile.mount_everest,
          non_negotiable_values: profile.non_negotiable_values,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-full mx-auto animate-pulse"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and how you'd like to be addressed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile?.user_name || ''}
                  onChange={(e) => setProfile({ ...profile, user_name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role/Title</Label>
                <Input
                  id="role"
                  value={profile?.role || ''}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  placeholder="e.g., Founder, CEO, Developer"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={profile?.industry || ''}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile?.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us about yourself and your work..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Vision & Values
            </CardTitle>
            <CardDescription>
              Define your Mount Everest vision and core principles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vision">Mount Everest Vision</Label>
              <Textarea
                id="vision"
                value={profile?.mount_everest?.vision_statement || ''}
                onChange={(e) => setProfile({ 
                  ...profile, 
                  mount_everest: { 
                    ...profile?.mount_everest, 
                    vision_statement: e.target.value 
                  }
                })}
                placeholder="Your ultimate goal or vision for the future..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="values">Core Values (comma-separated)</Label>
              <Input
                id="values"
                value={profile?.non_negotiable_values?.join(', ') || ''}
                onChange={(e) => setProfile({ 
                  ...profile, 
                  non_negotiable_values: e.target.value.split(',').map(v => v.trim()).filter(Boolean)
                })}
                placeholder="e.g., Integrity, Innovation, Family, Growth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Communication Tone</Label>
              <Input
                id="tone"
                value={profile?.tone || ''}
                onChange={(e) => setProfile({ ...profile, tone: e.target.value })}
                placeholder="e.g., Professional, Casual, Direct, Supportive"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
