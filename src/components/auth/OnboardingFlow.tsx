
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OnboardingData {
  user_name: string;
  role: string;
  industry: string;
  bio: string;
  tone: string;
  non_negotiable_values: string[];
  prime_directive: string;
  mount_everest_vision: string;
  mount_everest_why: string;
  mount_everest_purpose: string;
}

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    user_name: "",
    role: "",
    industry: "",
    bio: "",
    tone: "",
    non_negotiable_values: [],
    prime_directive: "",
    mount_everest_vision: "",
    mount_everest_why: "",
    mount_everest_purpose: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const coreValues = [
    "Justice", "Empowerment", "Healing", "Truth", "Integrity", 
    "Excellence", "Innovation", "Compassion", "Growth", "Impact"
  ];

  const handleValueToggle = (value: string) => {
    setData(prev => ({
      ...prev,
      non_negotiable_values: prev.non_negotiable_values.includes(value)
        ? prev.non_negotiable_values.filter(v => v !== value)
        : [...prev.non_negotiable_values, value]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const profileData = {
        user_id: user.id,
        user_name: data.user_name,
        role: data.role,
        industry: data.industry,
        bio: data.bio,
        tone: data.tone,
        non_negotiable_values: data.non_negotiable_values,
        prime_directive: data.prime_directive,
        mount_everest: {
          vision_statement: data.mount_everest_vision,
          why_it_matters: data.mount_everest_why,
          purpose_statement: data.mount_everest_purpose
        },
        inner_boardroom: {
          Oracle: {
            name: "Michelle Obama",
            tone: "Wise, compassionate, prophetic",
            domain: "Legacy, values, spiritual alignment",
            function: "Keeps Everest vision in focus"
          },
          Rhythm: {
            name: "Martha Stewart", 
            tone: "Tactical, calm, efficient",
            domain: "Planning, systems, operations",
            function: "Maintains flow + execution cadence"
          },
          Surgeon: {
            name: "Cody Sanchez",
            tone: "Intense, truth-extracting, raw", 
            domain: "Identity, belief systems, inner game",
            function: "Cuts through fear, ego, confusion"
          },
          Sage: {
            name: "James Baldwin",
            tone: "Razor-sharp, literary, morally unflinching",
            domain: "Truth, narrative power, cultural critique", 
            function: "Exposes deep truths and sharpens your message"
          },
          Warrior: {
            name: "Malcolm X",
            tone: "Fierce, assertive, justice-driven",
            domain: "Power, protection, momentum",
            function: "Defends your energy + drives bold moves"
          }
        },
        default_state_map: {
          tired: "Oracle",
          overwhelmed: "Rhythm", 
          doubtful: "Surgeon",
          scattered: "Sage",
          angry: "Warrior"
        },
        skill_accelerator_mode: true,
        auto_template_behavior: "Always offer frameworks, tools, and trackable actions when skill gaps are detected.",
        onboarding_completed: true
      };

      const { error } = await supabase
        .from('user_profiles')
        .insert(profileData);

      if (error) throw error;

      // Create default project
      await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: "Getting Started",
          description: "Your first LifeOS project to explore the system",
          color: "#6366F1"
        });

      toast.success("Profile created successfully!");
      onComplete();
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error("Failed to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user_name">Full Name</Label>
              <Input
                id="user_name"
                value={data.user_name}
                onChange={(e) => setData(prev => ({ ...prev, user_name: e.target.value }))}
                placeholder="Enter your full name"
                className="lifeos-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role" 
                value={data.role}
                onChange={(e) => setData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g., CEO, Designer, Developer"
                className="lifeos-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={data.industry}
                onChange={(e) => setData(prev => ({ ...prev, industry: e.target.value }))}
                placeholder="e.g., Real Estate, Technology, Education"
                className="lifeos-input"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Personal Bio</Label>
              <Textarea
                id="bio"
                value={data.bio}
                onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Describe yourself, your expertise, and what drives you..."
                className="lifeos-input min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Communication Tone</Label>
              <Input
                id="tone"
                value={data.tone}
                onChange={(e) => setData(prev => ({ ...prev, tone: e.target.value }))}
                placeholder="e.g., Empowering, direct, thoughtful"
                className="lifeos-input"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Non-Negotiable Values (Select up to 4)</Label>
              <div className="grid grid-cols-2 gap-3">
                {coreValues.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={data.non_negotiable_values.includes(value)}
                      onCheckedChange={() => handleValueToggle(value)}
                      disabled={!data.non_negotiable_values.includes(value) && data.non_negotiable_values.length >= 4}
                    />
                    <Label htmlFor={value} className="text-sm font-medium">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prime_directive">Prime Directive</Label>
              <Textarea
                id="prime_directive"
                value={data.prime_directive}
                onChange={(e) => setData(prev => ({ ...prev, prime_directive: e.target.value }))}
                placeholder="Your core operating principle or mission statement..."
                className="lifeos-input"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mount_everest_vision">Mount Everest Vision</Label>
              <Textarea
                id="mount_everest_vision"
                value={data.mount_everest_vision}
                onChange={(e) => setData(prev => ({ ...prev, mount_everest_vision: e.target.value }))}
                placeholder="Your ultimate life vision - what's your Mount Everest?"
                className="lifeos-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mount_everest_why">Why It Matters</Label>
              <Textarea
                id="mount_everest_why"
                value={data.mount_everest_why}
                onChange={(e) => setData(prev => ({ ...prev, mount_everest_why: e.target.value }))}
                placeholder="Why is this vision critically important to you?"
                className="lifeos-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mount_everest_purpose">Purpose Statement</Label>
              <Textarea
                id="mount_everest_purpose"
                value={data.mount_everest_purpose}
                onChange={(e) => setData(prev => ({ ...prev, mount_everest_purpose: e.target.value }))}
                placeholder="What do you exist to create or achieve?"
                className="lifeos-input"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Basic Information",
    "Personal Profile", 
    "Core Values",
    "Mount Everest Vision"
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl lifeos-card">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-full"></div>
          </div>
          <CardTitle className="text-2xl font-semibold">
            Welcome to LifeOS.ai
          </CardTitle>
          <CardDescription>
            Step {currentStep} of 4: {stepTitles[currentStep - 1]}
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="lifeos-button-secondary"
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!data.user_name || (currentStep === 3 && data.non_negotiable_values.length === 0)}
                className="lifeos-button-primary"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !data.mount_everest_vision}
                className="lifeos-button-primary"
              >
                {isSubmitting ? "Creating Profile..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
