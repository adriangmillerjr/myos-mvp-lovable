
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Target, Zap, ArrowRight, CheckSquare, BookOpen, Calendar, Menu, X, ChevronDown, Mail, Heart, Compass, Mountain, Leaf, Brain, Bot } from "lucide-react";
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
              <span className="font-bold text-xl">MyOS AI</span>
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
                  Try It Now
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
                      Try It Now
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
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <OrbitalInterface />
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
                MyOS AI
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your life deserves a better operating system. Master clarity, execute intelligently, and align every action with your Mount Everest vision.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/dashboard">
                <Button size="lg" className="lifeos-button-primary h-14 px-8 text-lg font-medium">
                  Try It Now
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

      {/* Features Section */}
      <div id="features" className="border-t border-border bg-surface/30">
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30">
        <div className="lifeos-container py-16">
          <div className="grid md:grid-cols-3 gap-8">
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

            {/* Community / Social */}
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
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Newsletter Sign-Up</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm" className="px-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
