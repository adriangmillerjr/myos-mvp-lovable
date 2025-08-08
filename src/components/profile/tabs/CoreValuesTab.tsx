import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const CoreValuesTab = () => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_profiles')
        .select('non_negotiable_values')
        .eq('user_id', user.id)
        .single();

      if (data?.non_negotiable_values) {
        setValues(data.non_negotiable_values);
      }
    })();
  }, []);

  const updateValues = async (value: string) => {
    const splitValues = value.split(',').map(v => v.trim()).filter(Boolean);
    setValues(splitValues);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from('user_profiles')
      .update({ non_negotiable_values: splitValues })
      .eq('user_id', user?.id);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="core-values">Core Values (comma-separated)</Label>
      <Input
        id="core-values"
        value={values.join(', ')}
        onChange={(e) => updateValues(e.target.value)}
        placeholder="e.g., Integrity, Innovation, Family"
      />
    </div>
  );
};

export default CoreValuesTab;
