import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import PersonalInfoTab from "@/components/profile/tabs/PersonalInfoTab";
import MountEverestTab from "@/components/profile/tabs/MountEverestTab";
import CoreValuesTab from "@/components/profile/tabs/CoreValuesTab";
import InnerBoardroomTab from "@/components/profile/tabs/InnerBoardroomTab";
import BehavioralProfileTab from "@/components/profile/tabs/BehavioralProfileTab";
import GuidesTab from "@/components/profile/tabs/GuidesTab";
import { toast } from "sonner";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      setProfile(
        data || {
          user_name: "",
          bio: "",
          role: "",
          industry: "",
          tone: "",
          mount_everest: { vision_statement: "" },
          non_negotiable_values: [],
          auto_template_behavior: "standard",
          default_state_map: {},
          inner_boardroom: {},
          prime_directive: "",
          behavioral_profile: {},
          guides: []
        }
      );
    } catch (err) {
      console.error("Error loading profile:", err);
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

      const { error } = await supabase.from("user_profiles").upsert({
        user_id: user.id,
        ...profile,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      toast.success("Profile saved successfully");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">MyOS Profile</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 gap-2 mb-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="everest">Mount Everest</TabsTrigger>
          <TabsTrigger value="values">Core Values</TabsTrigger>
          <TabsTrigger value="boardroom">Inner Boardroom</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral Profile</TabsTrigger>
          <TabsTrigger value="guides">Guides + Advisors</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="everest">
          <MountEverestTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="values">
          <CoreValuesTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="boardroom">
          <InnerBoardroomTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="behavioral">
          <BehavioralProfileTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="guides">
          <GuidesTab profile={profile} setProfile={setProfile} isSaving={isSaving} onSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
