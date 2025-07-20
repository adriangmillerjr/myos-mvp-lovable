
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface KpiMetric {
  id: string;
  metric_name: string;
  target_value: number | null;
  actual_value: number | null;
  period_start: string;
  period_end: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

const DEFAULT_METRICS = [
  { name: '🔥 Revenue Generated', icon: '🔥' },
  { name: '🧠 Masterclass Signups', icon: '🧠' },
  { name: '🎥 Longform Videos Posted', icon: '🎥' },
  { name: '🎞️ Shorts/Clips Distributed', icon: '🎞️' },
  { name: '🧰 Lead Magnet GPTs Built', icon: '🧰' },
  { name: '💬 Strategy Calls Booked', icon: '💬' },
  { name: '📨 Newsletter Sent', icon: '📨' },
  { name: '🧗 LifeOS Users/Opt-Ins', icon: '🧗' }
];

export const useKpiMetrics = () => {
  const [metrics, setMetrics] = useState<KpiMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState<{ start: Date; end: Date }>();

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    setCurrentWeek({ start: startOfWeek, end: endOfWeek });
  }, []);

  useEffect(() => {
    if (currentWeek) {
      loadMetrics();
    }
  }, [currentWeek]);

  const loadMetrics = async () => {
    if (!currentWeek) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('kpi_metrics')
        .select('*')
        .eq('user_id', user.id)
        .eq('period_type', 'weekly')
        .gte('period_start', currentWeek.start.toISOString().split('T')[0])
        .lte('period_end', currentWeek.end.toISOString().split('T')[0])
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Initialize missing metrics
      const existingMetricNames = new Set(data?.map(m => m.metric_name) || []);
      const missingMetrics = DEFAULT_METRICS.filter(m => !existingMetricNames.has(m.name));
      
      if (missingMetrics.length > 0) {
        await initializeMissingMetrics(missingMetrics, user.id);
      }

      setMetrics(data || []);
    } catch (error) {
      console.error('Error loading metrics:', error);
      toast.error('Failed to load KPI metrics');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeMissingMetrics = async (missingMetrics: typeof DEFAULT_METRICS, userId: string) => {
    if (!currentWeek) return;

    const newMetrics = missingMetrics.map(metric => ({
      user_id: userId,
      metric_name: metric.name,
      target_value: null,
      actual_value: null,
      period_type: 'weekly',
      period_start: currentWeek.start.toISOString().split('T')[0],
      period_end: currentWeek.end.toISOString().split('T')[0],
      metadata: { icon: metric.icon, notes: '' }
    }));

    const { error } = await supabase
      .from('kpi_metrics')
      .insert(newMetrics);

    if (error) {
      console.error('Error initializing metrics:', error);
    }
  };

  const updateMetric = async (id: string, updates: Partial<KpiMetric>) => {
    try {
      const { error } = await supabase
        .from('kpi_metrics')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setMetrics(prev => prev.map(m => 
        m.id === id ? { ...m, ...updates } : m
      ));
      
      toast.success('Metric updated successfully');
    } catch (error) {
      console.error('Error updating metric:', error);
      toast.error('Failed to update metric');
    }
  };

  const calculateProgress = (actual: number | null, target: number | null) => {
    if (!actual || !target || target === 0) return 0;
    return Math.min((actual / target) * 100, 100);
  };

  const formatWeekRange = () => {
    if (!currentWeek) return '';
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const start = currentWeek.start.toLocaleDateString('en-US', options);
    const end = currentWeek.end.toLocaleDateString('en-US', options);
    
    return `${start} - ${end}`;
  };

  return {
    metrics,
    isLoading,
    currentWeek,
    updateMetric,
    calculateProgress,
    formatWeekRange,
    refetch: loadMetrics
  };
};
