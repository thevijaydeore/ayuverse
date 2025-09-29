import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  TrendingUp, 
  Utensils, 
  Target, 
  Calendar, 
  Clock,
  Heart,
  Flame,
  Droplets,
  Wind
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PatientOverviewProps {
  setActiveModule: (module: string) => void;
}

const PatientOverview = ({ setActiveModule }: PatientOverviewProps) => {
  const { t } = useLanguage();

  const quickActions = [
    {
      title: "View Today's Diet",
      description: "Check your assigned diet plan",
      icon: Utensils,
      module: "my-diet-plan",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Track Meals",
      description: "Log your daily food intake",
      icon: Target,
      module: "nutrient-tracker",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Search Foods",
      description: "Explore ayurvedic food database",
      icon: Activity,
      module: "food-database",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Diet Suggestions",
      description: "Get personalized diet recommendations",
      icon: TrendingUp,
      module: "auto-diet-generator",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const healthMetrics = [
    { label: "Daily Calories", value: "1850", target: "2200", unit: "kcal", icon: Flame, color: "text-red-500" },
    { label: "Water Intake", value: "6", target: "8", unit: "glasses", icon: Droplets, color: "text-blue-500" },
    { label: "Meal Compliance", value: "85", target: "100", unit: "%", icon: Target, color: "text-green-500" },
    { label: "Dosha Balance", value: "Good", target: "Optimal", unit: "", icon: Wind, color: "text-purple-500" }
  ];

  const todaySchedule = [
    { time: "7:00 AM", meal: "Breakfast", status: "completed", calories: 450 },
    { time: "12:00 PM", meal: "Lunch", status: "pending", calories: 650 },
    { time: "4:00 PM", meal: "Evening Snack", status: "pending", calories: 200 },
    { time: "7:30 PM", meal: "Dinner", status: "pending", calories: 550 }
  ];

  const getDoshaIcon = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return <Wind className="w-4 h-4" />;
      case 'pitta': return <Flame className="w-4 h-4" />;
      case 'kapha': return <Droplets className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              {getDoshaIcon("Vata")}
              Welcome back, Arjun!
            </h1>
            <p className="text-primary-foreground/80">
              Your Dosha Type: <span className="font-semibold">Vata</span>
            </p>
            <p className="text-sm text-primary-foreground/60 mt-1">
              Today's diet compliance: 75% • Keep it up!
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">75%</div>
            <div className="text-sm text-primary-foreground/80">
              Compliance
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={action.module} 
            className="hover-scale cursor-pointer transition-all animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setActiveModule(action.module)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Metrics */}
        <Card className="lg:col-span-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Today's Health Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthMetrics.map((metric, index) => (
                <div key={metric.label} className="p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className={`w-4 h-4 ${metric.color}`} />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {metric.value}{metric.unit}
                    </Badge>
                  </div>
                  {metric.unit === "%" ? (
                    <Progress value={parseInt(metric.value)} className="h-2" />
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Target: {metric.target}{metric.unit}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    item.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' : 'bg-accent/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.meal}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={item.status === 'completed' ? 'default' : 'outline'} 
                      className="text-xs mb-1"
                    >
                      {item.status === 'completed' ? '✓' : '○'}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{item.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Completed breakfast - Warm daliya with ghee</span>
              <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Logged water intake - 2 glasses</span>
              <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">New diet plan assigned by Dr. Priya</span>
              <span className="text-xs text-muted-foreground ml-auto">Yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientOverview;