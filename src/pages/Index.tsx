import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Target, Zap, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-glow rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                LifeOS.ai
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your personalized AI productivity platform. Chat with specialized agents that understand your Mount Everest vision, core values, and current focus to help you achieve your highest potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-4 text-lg">
                  Start Chatting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-border hover:bg-surface">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powered by Specialized AI Agents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each agent is designed with a specific purpose, following the Forge framework for focused, effective assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ClarityOS */}
          <Card className="bg-card hover:shadow-medium transition-shadow border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">ClarityOS</h3>
              <p className="text-muted-foreground mb-4">
                Life mission and vision clarity tools. Align your daily actions with your Mount Everest vision.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-primary font-medium">🎯 ClarityOS__GPT</div>
                <div className="text-sm text-primary font-medium">⚡ ValuesAdvisor</div>
              </div>
            </CardContent>
          </Card>

          {/* WorkOS */}
          <Card className="bg-card hover:shadow-medium transition-shadow border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">WorkOS</h3>
              <p className="text-muted-foreground mb-4">
                Productivity and task management. Optimize your workflow and maintain deep focus.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-cyan-600 font-medium">📋 TaskMaster</div>
                <div className="text-sm text-cyan-600 font-medium">🎯 FocusCoach</div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Advisors */}
          <Card className="bg-card hover:shadow-medium transition-shadow border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Strategy Advisors</h3>
              <p className="text-muted-foreground mb-4">
                High-level strategic guidance. Get wise counsel for complex decisions and long-term planning.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-amber-600 font-medium">🧙‍♂️ AdvisorGPT__Sage</div>
                <div className="text-sm text-amber-600 font-medium">🏗️ DecisionArchitect</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to unlock your potential?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start chatting with AI agents that truly understand your unique vision and goals.
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-4 text-lg">
              Launch LifeOS.ai
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
