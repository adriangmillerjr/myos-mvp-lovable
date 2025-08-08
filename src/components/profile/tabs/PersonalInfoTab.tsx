import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const PersonalInfoTab = () => {
  const [profile, setProfile] = useState<any>({
    user_name: '',
    role: '',
    industry: '',
    bio: ''
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_profiles')
        .select('user_name, role, industry, bio')
        .eq('user_id', user.id)
        .single();

      if (data) setProfile(data);
    })();
  }, []);

  const updateField = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
    supabase.from('user_profiles').update({ [field]: value }).eq('user_id', supabase.auth.getUser().then(r => r.data.user?.id));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="user_name">Name</Label>
          <Input id="user_name" value={profile.user_name} onChange={(e) => updateField('user_name', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="role">Role/Title</Label>
          <Input id="role" value={profile.role} onChange={(e) => updateField('role', e.target.value)} />
        </div>
      </div>

      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input id="industry" value={profile.industry} onChange={(e) => updateField('industry', e.target.value)} />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={profile.bio} rows={4} onChange={(e) => updateField('bio', e.target.value)} />
      </div>
    </div>
  );
};

export default PersonalInfoTab;
