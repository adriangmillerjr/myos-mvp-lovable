
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Target, Zap, ArrowRight, CheckSquare, BookOpen, Calendar } from "lucide-react";
import { OrbitalInterface } from "@/components/ui/orbital-interface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sophisticated Hero Section */}
      <div className="relative overflow-hidden">
        <div className="lifeos-container py-24 lg:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <OrbitalInterface />
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
                LifeOS.ai
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your personalized AI productivity operating system. Master clarity, execute intelligently, and align every action with your Mount Everest vision.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/dashboard">
                <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
                  Enter LifeOS.ai
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="lifeos-button-secondary h-14 px-8 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Sophisticated Features Section */}
      <div className="border-t border-border bg-surface/30">
        <div className="lifeos-container py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Unified Productivity Operating System
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Six integrated modules working together to transform how you think, plan, and execute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Projects */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Projects</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Organize your life into focused workspaces. Each project maintains its own context, tasks, and AI agent configurations.
                </p>
                <div className="text-sm font-medium text-primary">
                  Workspace Management
                </div>
              </CardContent>
            </Card>

            {/* KPI Dashboard */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">KPI Dashboard</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Track what matters most. Revenue, content creation, signups, and custom metrics aligned with your Mount Everest vision.
                </p>
                <div className="text-sm font-medium text-primary">
                  Performance Tracking
                </div>
              </CardContent>
            </Card>

            {/* Master Tasks */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <CheckSquare className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Master Tasks</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every task scored for Cash Proximity (CPS) and Everest alignment. Focus on what truly moves the needle.
                </p>
                <div className="text-sm font-medium text-primary">
                  Intelligent Prioritization
                </div>
              </CardContent>
            </Card>

            {/* Weekly Reports */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Weekly Reports</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  AI-generated insights on task completion, bottlenecks, and strategic recommendations for the week ahead.
                </p>
                <div className="text-sm font-medium text-primary">
                  Strategic Insights
                </div>
              </CardContent>
            </Card>

            {/* Journal */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Journal</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Daily reflections connected to your tasks and goals. Track energy, focus, and personal growth over time.
                </p>
                <div className="text-sm font-medium text-primary">
                  Personal Insights
                </div>
              </CardContent>
            </Card>

            {/* AI Orchestration */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">AI Orchestration</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Multiple specialized AI agents working together. ClarityOS, Sage, Health, and more activate based on context.
                </p>
                <div className="text-sm font-medium text-primary">
                  Intelligent Assistance
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sophisticated CTA Section */}
      <div className="border-t border-border">
        <div className="lifeos-container py-24 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to master your potential?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the operating system that aligns your daily actions with your Mount Everest vision.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
