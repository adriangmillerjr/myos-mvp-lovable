
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Edit3, Check, X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiMetricCardProps {
  metric: {
    id: string;
    metric_name: string;
    target_value: number | null;
    actual_value: number | null;
    metadata: any;
  };
  progress: number;
  onUpdate: (id: string, updates: any) => Promise<void>;
}

export const KpiMetricCard = ({ metric, progress, onUpdate }: KpiMetricCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(metric.target_value?.toString() || '');
  const [tempActual, setTempActual] = useState(metric.actual_value?.toString() || '');
  const [tempNotes, setTempNotes] = useState(metric.metadata?.notes || '');
  const [showNotes, setShowNotes] = useState(false);

  const handleSave = async () => {
    await onUpdate(metric.id, {
      target_value: tempTarget ? parseFloat(tempTarget) : null,
      actual_value: tempActual ? parseFloat(tempActual) : null,
      metadata: {
        ...metric.metadata,
        notes: tempNotes
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempTarget(metric.target_value?.toString() || '');
    setTempActual(metric.actual_value?.toString() || '');
    setTempNotes(metric.metadata?.notes || '');
    setIsEditing(false);
  };

  const getTrendIcon = () => {
    // Mock trend calculation - in real app, you'd compare with previous week
    const actual = metric.actual_value || 0;
    const target = metric.target_value || 0;
    
    if (actual > target) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (actual < target * 0.8) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-yellow-500" />;
  };

  const getStatusColor = () => {
    if (progress >= 100) return 'text-green-500';
    if (progress >= 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {metric.metric_name}
            {getTrendIcon()}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Target</label>
                <Input
                  type="number"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  className="h-8"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Actual</label>
                <Input
                  type="number"
                  value={tempActual}
                  onChange={(e) => setTempActual(e.target.value)}
                  className="h-8"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Notes</label>
              <Textarea
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                className="h-16 text-xs"
                placeholder="Add context, blockers, or notes..."
              />
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="h-7">
                <Check className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-7">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {metric.actual_value || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  of {metric.target_value || 0} target
                </div>
              </div>
              <div className={cn("text-sm font-medium", getStatusColor())}>
                {progress.toFixed(0)}%
              </div>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            {metric.metadata?.notes && (
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 p-0 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  {showNotes ? 'Hide' : 'Show'} Notes
                </Button>
                {showNotes && (
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    {metric.metadata.notes}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
