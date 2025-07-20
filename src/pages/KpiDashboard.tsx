
import { BarChart3, Calendar, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiMetricCard } from '@/components/dashboard/KpiMetricCard';
import { useKpiMetrics } from '@/hooks/useKpiMetrics';

export default function KpiDashboard() {
  const { 
    metrics, 
    isLoading, 
    updateMetric, 
    calculateProgress, 
    formatWeekRange 
  } = useKpiMetrics();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-full mx-auto animate-pulse"></div>
          <p className="text-muted-foreground">Loading KPI Dashboard...</p>
        </div>
      </div>
    );
  }

  const totalMetrics = metrics.length;
  const metricsWithTargets = metrics.filter(m => m.target_value && m.target_value > 0).length;
  const achievedTargets = metrics.filter(m => 
    m.target_value && m.actual_value && m.actual_value >= m.target_value
  ).length;
  const avgProgress = metrics.length > 0 
    ? metrics.reduce((sum, m) => sum + calculateProgress(m.actual_value, m.target_value), 0) / metrics.length 
    : 0;

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">KPI Dashboard</h1>
            <p className="text-muted-foreground">
              Track your weekly growth and productivity metrics
            </p>
          </div>
        </div>

        {/* Week Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle>Week of {formatWeekRange()}</CardTitle>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {achievedTargets}/{metricsWithTargets} targets hit
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {avgProgress.toFixed(0)}% avg progress
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <KpiMetricCard
              key={metric.id}
              metric={metric}
              progress={calculateProgress(metric.actual_value, metric.target_value)}
              onUpdate={updateMetric}
            />
          ))}
        </div>

        {/* Empty State */}
        {metrics.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No metrics for this week yet
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Your KPI metrics will automatically appear here. Start by setting targets 
                and tracking your progress throughout the week.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use Your KPI Dashboard</CardTitle>
            <CardDescription>
              Make the most of your weekly productivity tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Click the edit icon on any metric card to set targets and update actual values</p>
            <p>• Add notes to capture context, blockers, or strategic insights for each metric</p>
            <p>• Progress bars and trend indicators help visualize your performance at a glance</p>
            <p>• All changes are automatically saved and synced across your devices</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
