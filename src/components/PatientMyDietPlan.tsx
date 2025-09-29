import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Utensils, Activity, Flame, Droplets, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const PatientMyDietPlan = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [mealCompliance, setMealCompliance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  });

  // Static diet plan data - would come from doctor assignment
  const dietPlan = {
    patientName: "Arjun Sharma",
    dosha: "Vata",
    duration: "7 days",
    dailyCalories: 2200,
    assignedBy: "Dr. Priya Sharma",
    meals: {
      breakfast: {
        time: "7:00-8:00 AM",
        items: [
          { name: "गर्म दलिया with Ghee", quantity: "1 bowl", calories: 300, ayurvedicNote: "Vata को संतुलित करता है" },
          { name: "हल्दी दूध (Turmeric Milk)", quantity: "1 glass", calories: 150, ayurvedicNote: "Immunity booster" },
          { name: "खजूर और बादाम", quantity: "3-4 pieces", calories: 100, ayurvedicNote: "Natural energy" }
        ]
      },
      lunch: {
        time: "12:00-1:00 PM",
        items: [
          { name: "खिचड़ी with vegetables", quantity: "1 bowl", calories: 400, ayurvedicNote: "Perfect for Vata dosha" },
          { name: "गाय का घी", quantity: "1 tsp", calories: 45, ayurvedicNote: "Digestive fire enhancer" },
          { name: "छाछ (Buttermilk)", quantity: "1 glass", calories: 80, ayurvedicNote: "Cooling & digestive" }
        ]
      },
      dinner: {
        time: "7:00-8:00 PM",
        items: [
          { name: "रोटी (Whole wheat)", quantity: "2 pieces", calories: 200, ayurvedicNote: "Grounding for Vata" },
          { name: "मूंग दाल", quantity: "1/2 bowl", calories: 150, ayurvedicNote: "Easy to digest" },
          { name: "लौकी sabzi", quantity: "1/2 bowl", calories: 80, ayurvedicNote: "Cooling & nourishing" }
        ]
      },
      snacks: {
        time: "4:00-5:00 PM",
        items: [
          { name: "अदरक चाय (Ginger Tea)", quantity: "1 cup", calories: 30, ayurvedicNote: "Digestive stimulant" },
          { name: "मखाना roasted", quantity: "1/4 cup", calories: 90, ayurvedicNote: "Sattvic snack" }
        ]
      }
    }
  };

  const guidelines = [
    "खाना धीरे-धीरे और शांत वातावरण में खाएं",
    "भोजन के बाद 10 मिनट टहलें",
    "ठंडे पेय और आइसक्रीम से बचें",
    "नियमित समय पर भोजन करें",
    "भोजन के साथ पानी कम पिएं"
  ];

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'lunch': return <Utensils className="w-5 h-5 text-green-500" />;
      case 'dinner': return <Utensils className="w-5 h-5 text-blue-500" />;
      case 'snacks': return <Utensils className="w-5 h-5 text-purple-500" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return <Activity className="w-4 h-4" />;
      case 'pitta': return <Flame className="w-4 h-4" />;
      case 'kapha': return <Droplets className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const markMealAsEaten = (mealType: string) => {
    setMealCompliance(prev => ({
      ...prev,
      [mealType]: !prev[mealType as keyof typeof prev]
    }));
    
    const wasEaten = mealCompliance[mealType as keyof typeof mealCompliance];
    
    toast({
      title: wasEaten 
        ? t('patient.dietPlan.mealUnmarked') || "Meal unmarked"
        : t('patient.dietPlan.mealMarked') || "Meal marked as eaten",
      description: wasEaten
        ? t('patient.dietPlan.mealUnmarkedDesc') || "Removed from today's log"
        : t('patient.dietPlan.mealMarkedDesc') || "Great job following your diet plan!",
    });
  };

  const calculateProgress = () => {
    const completed = Object.values(mealCompliance).filter(Boolean).length;
    return (completed / 4) * 100;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              {getDoshaIcon(dietPlan.dosha)}
              My Diet Plan
            </h1>
            <p className="text-primary-foreground/80">
              Assigned by: {dietPlan.assignedBy}
            </p>
            <p className="text-sm text-primary-foreground/60">
              Duration: {dietPlan.duration} • 
              Daily Calories: {dietPlan.dailyCalories}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{Math.round(calculateProgress())}%</div>
            <div className="text-sm text-primary-foreground/80">
              Today's Progress
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Progress 
            value={calculateProgress()} 
            className="h-2 bg-primary-foreground/20"
          />
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {t("patient.dietPlan.today") || "Today"}
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            {t("patient.dietPlan.guidelines") || "Guidelines"}
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {t("patient.dietPlan.progress") || "Progress"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-6">
          {/* Meals */}
          {Object.entries(dietPlan.meals).map(([mealType, meal], index) => (
            <Card key={mealType} className="animate-scale-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getMealIcon(mealType)}
                    {t(`patient.dietPlan.${mealType}`) || mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {meal.time}
                    </Badge>
                    <Button
                      variant={mealCompliance[mealType as keyof typeof mealCompliance] ? "default" : "outline"}
                      size="sm"
                      onClick={() => markMealAsEaten(mealType)}
                      className="hover-scale"
                    >
                      <CheckCircle className={`w-4 h-4 mr-1 ${
                        mealCompliance[mealType as keyof typeof mealCompliance] ? "text-primary-foreground" : "text-primary"
                      }`} />
                      {mealCompliance[mealType as keyof typeof mealCompliance] 
                        ? t("patient.dietPlan.eaten") || "Eaten"
                        : t("patient.dietPlan.markEaten") || "Mark as Eaten"
                      }
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg transition-all hover:bg-accent/70">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {item.calories} cal
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                        <p className="text-xs text-primary/80 mt-1">{item.ayurvedicNote}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      {t("patient.dietPlan.totalCalories") || "Total Calories"}:
                    </span>
                    <span>{meal.items.reduce((total, item) => total + item.calories, 0)} cal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="guidelines" className="mt-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {t("patient.dietPlan.ayurvedicGuidelines") || "Ayurvedic Guidelines"}
              </CardTitle>
              <CardDescription>
                {t("patient.dietPlan.guidelinesDesc") || "Important rules to follow for optimal health"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-medium">{index + 1}</span>
                    </div>
                    <p className="text-sm">{guideline}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>{t("patient.dietPlan.weeklyProgress") || "Weekly Progress"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={[85, 92, 78, 88, 95, 82, 90][index]} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">{[85, 92, 78, 88, 95, 82, 90][index]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>{t("patient.dietPlan.nutritionSummary") || "Nutrition Summary"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Carbohydrates</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-24 h-2" />
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Proteins</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-24 h-2" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fats</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-24 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientMyDietPlan;