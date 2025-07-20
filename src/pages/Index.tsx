
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Target, Zap, ArrowRight, LifeBuoy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Clean Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground text-background mb-8">
              <LifeBuoy className="h-8 w-8" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight text-foreground">
                LifeOS.ai
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your personalized AI productivity platform. Chat with specialized agents that understand your vision, values, and goals to help you achieve your highest potential.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to="/chat">
                <Button size="lg" className="h-12 px-8 text-base font-medium">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Features Section */}
      <div className="border-t border-border bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Specialized AI Agents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each agent is designed with a specific purpose, following focused frameworks for effective assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ClarityOS */}
            <Card className="border-border shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">ClarityOS</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Life mission and vision clarity tools. Align your daily actions with your Mount Everest vision.
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">🎯 ClarityOS__GPT</div>
                  <div className="text-sm font-medium text-foreground">⚡ ValuesAdvisor</div>
                </div>
              </CardContent>
            </Card>

            {/* WorkOS */}
            <Card className="border-border shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">WorkOS</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Productivity and task management. Optimize your workflow and maintain deep focus.
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">📋 TaskMaster</div>
                  <div className="text-sm font-medium text-foreground">🎯 FocusCoach</div>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Advisors */}
            <Card className="border-border shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mb-6">
                  <Bot className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Strategy Advisors</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  High-level strategic guidance. Get wise counsel for complex decisions and long-term planning.
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">🧙‍♂️ AdvisorGPT__Sage</div>
                  <div className="text-sm font-medium text-foreground">🏗️ DecisionArchitect</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Clean CTA Section */}
      <div className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to unlock your potential?
          </h2>
          <p className="text-lg text-muted-foreground">
            Start chatting with AI agents that truly understand your unique vision and goals.
          </p>
          <Link to="/chat">
            <Button size="lg" className="h-12 px-8 text-base font-medium">
              Launch LifeOS.ai
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
