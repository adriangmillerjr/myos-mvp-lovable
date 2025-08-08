import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const InnerBoardroomTab = () => {
  const [boardroom, setBoardroom] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBoardroom = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('user_profiles').select('inner_boardroom').eq('user_id', user.id).single();
      if (data?.inner_boardroom) setBoardroom(data.inner_boardroom);
      setIsLoading(false);
    };
    loadBoardroom();
  }, []);

  const handleChange = (key: string, value: string) => {
    setBoardroom(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from('user_profiles').update({ inner_boardroom: boardroom }).eq('user_id', user.id);
    if (error) toast.error("Failed to save inner boardroom");
    else toast.success("Inner Boardroom saved");
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {['Strategist', 'Peacemaker', 'Warrior', 'Dreamer'].map(role => (
          <div key={role} className="space-y-2">
            <Label htmlFor={role}>{role}</Label>
            <Textarea id={role} value={boardroom[role] || ''} onChange={e => handleChange(role, e.target.value)} rows={3} />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Boardroom"}
      </Button>
    </div>
  );
};

export default InnerBoardroomTab;