import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarChart3, Target, Zap, ArrowRight, CheckSquare, BookOpen, Calendar, Menu, X, ChevronDown, Mail, Heart, Compass, Mountain, Leaf, Brain, Bot, MessageSquare, Clock, Sparkles, Users, Star, Crown } from "lucide-react";
import { OrbitalInterface } from "@/components/ui/orbital-interface";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const productDropdownItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Integrations", href: "#integrations" },
    { name: "Life Dashboard Preview", href: "#dashboard-preview", comingSoon: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="lifeos-container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
              </div>
              <span className="font-bold text-xl">MyOS Powered by AI</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
                >
                  <span>Product</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {isProductDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-50">
                    <div className="py-2">
                      {productDropdownItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setIsProductDropdownOpen(false)}
                        >
                          {item.name}
                          {item.comingSoon && (
                            <span className="ml-2 text-xs text-muted-foreground">(coming soon)</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/clarity-quiz" className="text-sm font-medium hover:text-primary transition-colors">
                Clarity Quiz
              </Link>
              <Link to="/masterclass" className="text-sm font-medium hover:text-primary transition-colors">
                Masterclass
              </Link>
              <Link to="/auth" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hidden md:inline-flex">
                <Button className="lifeos-button-primary">
                  Build My Operating System
                </Button>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-accent rounded-md"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border bg-background">
              <div className="py-4 space-y-2">
                <Link to="/" className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Home
                </Link>
                <div className="px-4 py-2">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Product</div>
                  <div className="pl-4 space-y-2">
                    {productDropdownItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        {item.name}
                        {item.comingSoon && (
                          <span className="ml-2 text-xs text-muted-foreground">(coming soon)</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
                <Link to="/clarity-quiz" className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Clarity Quiz
                </Link>
                <Link to="/masterclass" className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Masterclass
                </Link>
                <Link to="/auth" className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md">
                  Login
                </Link>
                <div className="px-4 pt-2">
                  <Link to="/dashboard">
                    <Button className="w-full lifeos-button-primary">
                      Build My Operating System
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="lifeos-container py-24 lg:py-32">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4">MyOS AI</div>
            <OrbitalInterface />
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
                Your Life Deserves a Better Operating System.
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Breathe. Reset. Realign. Take back your time, your clarity, and your life.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
                Build My Operating System
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="secondary" className="lifeos-button-secondary h-14 px-8 text-lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="space-y-4 pt-6">
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                In just minutes, MyOS AI helps you uncover what's beneath the chaos — so you can discover who you were meant to be.
              </p>
              
              <div className="space-y-2">
                <p className="text-lg md:text-xl font-semibold text-foreground">
                  Think Less. Win More.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Because clarity, not hustle, creates results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* NEW: Why We Built This Section */}
      <div className="border-t border-border bg-surface/30">
        <div className="lifeos-container py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Why We Built This
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                Adrian was overwhelmed — juggling properties, content, finances, and life. Every day felt like a maze of decisions, distractions, and delays.
              </p>
              
              <p>
                Urania, a creative with ADHD, struggled to focus and remember critical tasks. She needed something that could help her stay on track — not just organize, but protect her.
              </p>
              
              <p>
                That's why they built MyOS AI: to help everyday people reclaim control, clarity, and capacity in a world of noise.
              </p>
            </div>

            {/* Placeholder for future profile photos or video */}
            <div className="flex justify-center pt-8">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Watch Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="border-t border-border bg-background">
        <div className="lifeos-container py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Built for Clarity-Driven Living
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Twelve essential tools to reset your focus, reclaim your time, and realign your life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 mt-12">
            {/* Core OS Modules Group */}
            <h3 className="col-span-full text-xl font-bold text-foreground mt-6 mb-2">
              Your Core OS Modules
            </h3>
            
            {/* Clarity Engine */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Clarity Engine</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered focus finder that surfaces what matters most each day
                </p>
              </CardContent>
            </Card>

            {/* Life Dashboard */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Life Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize your progress across life domains — health, finance, energy & more
                </p>
              </CardContent>
            </Card>

            {/* My Tasks */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <CheckSquare className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">My Tasks</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Smart task manager with AI-assisted prioritization and Do/Delay/Delegate flow
                </p>
              </CardContent>
            </Card>

            {/* My Journal */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">My Journal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Guided reflections and state tracking to declutter your mind
                </p>
              </CardContent>
            </Card>

            {/* Smart Productivity Assistants Group */}
            <h3 className="col-span-full text-xl font-bold text-foreground mt-6 mb-2">
              Smart Productivity Assistants
            </h3>

            {/* Calendar Assistant */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Calendar Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimize your schedule based on energy, impact, and clarity zones
                </p>
              </CardContent>
            </Card>

            {/* Email Assistant */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Email Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered inbox triage: sort by purpose, delete noise, and prep your day
                </p>
              </CardContent>
            </Card>

            {/* Motivational Guide */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Motivational Guide</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Daily voice-powered nudges from inner guides to keep your mindset strong
                </p>
              </CardContent>
            </Card>

            {/* Clarity Quiz */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Compass className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Clarity Quiz</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Personality-based assessment to surface blockers, drivers, and alignment path
                </p>
              </CardContent>
            </Card>

            {/* Clarity Tools & Guides Group */}
            <h3 className="col-span-full text-xl font-bold text-foreground mt-6 mb-2">
              Clarity Tools & Guides
            </h3>

            {/* Everest Alignment */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Mountain className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Everest Alignment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every task links to your biggest goals — from revenue to relationships
                </p>
              </CardContent>
            </Card>

            {/* Life Management */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Life Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track the metrics that matter: joy, habits, time, energy, and alignment
                </p>
              </CardContent>
            </Card>

            {/* MyOS Boardroom */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">MyOS Boardroom</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your inner advisory team — Warrior, Oracle, Sage & more — now powered by AI
                </p>
              </CardContent>
            </Card>

            {/* Personal Assistant */}
            <Card className="lifeos-card hover:shadow-medium transition-shadow duration-smooth">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Personal Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI orchestration across tasks, messages, meetings — all under one OS
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Transformation Visual Strip */}
      <div className="border-t border-border bg-background">
        <div className="lifeos-container py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              See how MyOS AI turns this → into this
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Chaos Side */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-muted-foreground text-center mb-8">Before: Chaos</h3>
              
              <div className="space-y-4">
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="h-5 w-5 text-destructive" />
                      <span className="font-medium text-foreground">Messy Google Calendar</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Back-to-back meetings with no breathing room</p>
                  </CardContent>
                </Card>

                <Card className="bg-warning/10 border-warning/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mail className="h-5 w-5 text-warning" />
                      <span className="font-medium text-foreground">10k+ unread emails</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Inbox anxiety and decision paralysis</p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-muted">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">Post-it notes everywhere</span>
                    </div>
                    <p className="text-sm text-muted-foreground">"What was I supposed to do again?" moments</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Clarity Side */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary text-center mb-8">After: Clarity</h3>
              
              <div className="space-y-4">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Aligned dashboard</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Everything you need, nothing you don't</p>
                  </CardContent>
                </Card>

                <Card className="bg-success/10 border-success/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className="h-5 w-5 text-success" />
                      <span className="font-medium text-foreground">Daily priorities clearly surfaced</span>
                    </div>
                    <p className="text-sm text-muted-foreground">"Let's win today" mindset</p>
                  </CardContent>
                </Card>

                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <BookOpen className="h-5 w-5 text-accent-foreground" />
                      <span className="font-medium text-foreground">Simple journal reflection</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Mental clarity through guided thought</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clarity Quiz Preview */}
      <div className="border-t border-border bg-surface/30">
        <div className="lifeos-container py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              You're Not Broken — You've Just Been Operating Without a System.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Let MyOS AI meet you where you are. In minutes, we'll uncover what's really draining you — and show you how to take your life back.
            </p>
          </div>

          {/* Quiz Preview */}
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-6">
              <Card className="lifeos-card">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    What's draining most of your energy right now?
                  </h3>
                  <RadioGroup className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overwhelm" />
                      <span className="text-muted-foreground">Constant overwhelm and decision fatigue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="procrastination" />
                      <span className="text-muted-foreground">Procrastination and lack of focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="clarity" />
                      <span className="text-muted-foreground">Not knowing what really matters</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="lifeos-card">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Where do you feel most stuck?
                  </h3>
                  <RadioGroup className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="goals" />
                      <span className="text-muted-foreground">Setting and achieving meaningful goals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="habits" />
                      <span className="text-muted-foreground">Building consistent daily habits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balance" />
                      <span className="text-muted-foreground">Balancing work and personal life</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
                Begin Your Reset
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Inner Circle */}
      <div className="border-t border-border bg-accent-soft/50">
        <div className="lifeos-container py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Join the Inner Circle
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground">
              Be one of the first 300 visionaries to shape the future of life clarity.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The Inner Circle is our private founding group. You'll get exclusive access to premium GPTs, early features, and member-only strategy sessions — and help shape the next evolution of MyOS AI.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
                Apply to Join
                <Users className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>Limit 300 members</span>
                </div>
                <span>•</span>
                <span>$500 early access seat</span>
                <span>•</span>
                <span>Includes shared upside reward</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Final CTA Section */}
      <div className="border-t border-border">
        <div className="lifeos-container py-24 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to reboot your potential?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the operating system that aligns your daily actions with your Mount Everest vision.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
              Reboot My Life
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30">
        <div className="lifeos-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand & Ethos */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                </div>
                <span className="font-bold text-xl">MyOS AI</span>
              </div>
              <p className="text-muted-foreground">
                Your life deserves a better operating system.
              </p>
              <p className="text-muted-foreground">
                Built by Geeked Technologies for people who are done with the hustle and ready for aligned living.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Navigation</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <Link to="/clarity-quiz" className="block text-muted-foreground hover:text-primary transition-colors">
                  Clarity Quiz
                </Link>
                <Link to="/masterclass" className="block text-muted-foreground hover:text-primary transition-colors">
                  Masterclass
                </Link>
                <a href="#how-it-works" className="block text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#dashboard-preview" className="block text-muted-foreground hover:text-primary transition-colors">
                  Life Dashboard Preview
                </a>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </div>
            </div>

            {/* Community / Social - Updated Newsletter */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="https://www.youtube.com/@adriangmillerjr?sub_confirmation=1" className="block text-muted-foreground hover:text-primary transition-colors">
                  YouTube
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Join Our Community
                </a>
              </div>
              <div className="mt-6 space-y-2">
                <h5 className="font-medium text-foreground">Newsletter Sign-Up</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm" className="px-6 lifeos-button-primary rounded-lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border">
          <div className="lifeos-container py-6 text-center">
            <p className="text-muted-foreground">
              © 2025 MyOS AI. Built with clarity + care by Geeked Technologies.
              <br />
              Clarity — not hustle — creates results.
              <br />
              Made with 🧡 in Chicago. Built for humans, Powered By AI.
            </p>
            <div className="mt-4">
              <small>
                <Link to="/privacy" className="text-xs underline mr-2 text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                {" | "}
                <Link to="/terms" className="text-xs underline ml-2 text-muted-foreground hover:text-primary">
                  Terms of Use
                </Link>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
