import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const MountEverestTab = () => {
  const [vision, setVision] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_profiles')
        .select('mount_everest')
        .eq('user_id', user.id)
        .single();

      if (data?.mount_everest?.vision_statement) {
        setVision(data.mount_everest.vision_statement);
      }
    })();
  }, []);

  const updateVision = async (value: string) => {
    setVision(value);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('user_profiles')
      .update({ mount_everest: { vision_statement: value } })
      .eq('user_id', user?.id);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="vision">Your Mount Everest Vision</Label>
      <Textarea
        id="vision"
        value={vision}
        onChange={(e) => updateVision(e.target.value)}
        placeholder="Your ultimate mission, purpose, or long-term aim"
        rows={4}
      />
    </div>
  );
};

export default MountEverestTab;
