import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Users, BookOpen, Calculator, FileText } from "lucide-react";

const Welcome = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient profiles with Ayurvedic constitution analysis"
    },
    {
      icon: BookOpen,
      title: "Food Database",
      description: "Extensive database of foods with nutritional and Ayurvedic properties"
    },
    {
      icon: Calculator,
      title: "Nutrient Calculator",
      description: "Advanced calculations combining modern nutrition with Ayurvedic principles"
    },
    {
      icon: Heart,
      title: "Diet Generation",
      description: "AI-powered personalized diet plans based on dosha and health goals"
    },
    {
      icon: FileText,
      title: "Reports & Analytics",
      description: "Detailed reports and progress tracking for better patient outcomes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-healing rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">आयुVerse</h1>
              <p className="text-sm text-muted-foreground">Holistic Nutrition Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-healing">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            SIH 2025 Healthcare Innovation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Ayurvedic Diet & Nutrition Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Revolutionizing healthcare with the perfect blend of ancient Ayurvedic wisdom and modern nutritional science. 
            Personalized diet plans that honor your unique constitution and health goals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-healing shadow-glow">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Healthcare Management</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to provide holistic nutrition care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-healing">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Join thousands of healthcare professionals using आयुVerse to provide personalized, 
            holistic nutrition care that honors traditional wisdom and modern science.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="shadow-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-semibold">आयुVerse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 आयुVerse. Bridging ancient wisdom with modern healthcare.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;