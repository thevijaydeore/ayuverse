import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, 
  Users, 
  Wand2, 
  Download, 
  Share,
  Clock,
  Leaf,
  Flame,
  Droplets,
  Sun,
  Moon,
  Coffee
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DietPlan {
  patientName: string;
  dosha: string;
  duration: string;
  totalCalories: number;
  meals: Record<string, {
    time: string;
    items: Array<{
      name: string;
      quantity: string;
      calories: number;
      ayurvedicNote: string;
    }>;
    totalCalories: number;
  }>;
  guidelines: string[];
  herbs: Array<{
    name: string;
    dosage: string;
    time: string;
    benefit: string;
  }>;
}

const DietGenerator = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const patients = [
    { id: "1", name: "Rajesh Kumar", dosha: "Vata", age: 45 },
    { id: "2", name: "Priya Verma", dosha: "Pitta", age: 32 },
    { id: "3", name: "Amit Singh", dosha: "Kapha", age: 38 }
  ];

  const sampleDietPlan = {
    patientName: "Rajesh Kumar",
    dosha: "Vata",
    duration: "7 days",
    totalCalories: 1800,
    meals: {
      breakfast: {
        time: "7:00 AM",
        items: [
          { name: "Warm Oats with Ghee", quantity: "1 cup", calories: 320, ayurvedicNote: "Nourishing for Vata" },
          { name: "Warm Milk with Turmeric", quantity: "1 glass", calories: 150, ayurvedicNote: "Grounding and warming" }
        ],
        totalCalories: 470
      },
      lunch: {
        time: "12:30 PM",
        items: [
          { name: "Khichdi with Vegetables", quantity: "1.5 cups", calories: 450, ayurvedicNote: "Easy to digest, balances Vata" },
          { name: "Ghee", quantity: "1 tbsp", calories: 120, ayurvedicNote: "Essential for Vata nourishment" },
          { name: "Buttermilk", quantity: "1 glass", calories: 80, ayurvedicNote: "Aids digestion" }
        ],
        totalCalories: 650
      },
      evening: {
        time: "4:00 PM",
        items: [
          { name: "Herbal Tea with Ginger", quantity: "1 cup", calories: 20, ayurvedicNote: "Warming and digestive" },
          { name: "Dates and Almonds", quantity: "3 dates, 5 almonds", calories: 180, ayurvedicNote: "Nourishing snack for Vata" }
        ],
        totalCalories: 200
      },
      dinner: {
        time: "7:00 PM",
        items: [
          { name: "Quinoa with Steamed Vegetables", quantity: "1 cup", calories: 350, ayurvedicNote: "Light yet nourishing" },
          { name: "Mung Dal Soup", quantity: "1 bowl", calories: 130, ayurvedicNote: "Easy to digest protein" }
        ],
        totalCalories: 480
      }
    },
    guidelines: [
      "Eat warm, cooked foods to balance Vata",
      "Include healthy fats like ghee and nuts",
      "Avoid cold, raw, or dry foods",
      "Maintain regular meal times",
      "Stay hydrated with warm water"
    ],
    herbs: [
      { name: "Ashwagandha", dosage: "500mg", time: "Before bed", benefit: "Reduces stress and anxiety" },
      { name: "Triphala", dosage: "1 tsp", time: "Before sleep", benefit: "Improves digestion and elimination" }
    ]
  };

  const handleGeneratePlan = async () => {
    if (!selectedPatient) {
      toast({
        title: "Select Patient",
        description: "Please select a patient to generate a diet plan",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan(sampleDietPlan);
      setIsGenerating(false);
      toast({
        title: "Diet Plan Generated!",
        description: "Personalized Ayurvedic diet plan has been created",
      });
    }, 2000);
  };

  const handleSavePlan = () => {
    toast({
      title: "Plan Saved",
      description: "Diet plan has been saved to patient records",
    });
  };

  const handleDownloadPlan = () => {
    toast({
      title: "Download Started",
      description: "PDF version of the diet plan is being generated",
    });
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return <Sun className="w-5 h-5 text-warning" />;
      case 'lunch': return <Utensils className="w-5 h-5 text-primary" />;
      case 'evening': return <Coffee className="w-5 h-5 text-accent-gold" />;
      case 'dinner': return <Moon className="w-5 h-5 text-muted-foreground" />;
      default: return <Utensils className="w-5 h-5" />;
    }
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return <Leaf className="w-4 h-4 text-success" />;
      case 'pitta': return <Flame className="w-4 h-4 text-destructive" />;
      case 'kapha': return <Droplets className="w-4 h-4 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Diet Plan Generator</h1>
          <p className="text-muted-foreground">Create personalized Ayurvedic diet plans based on dosha and health goals</p>
        </div>
      </div>

      {/* Generator Section */}
      <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Generate New Diet Plan
          </CardTitle>
          <CardDescription>
            Select a patient and generate a personalized Ayurvedic diet plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Select Patient</label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a patient..." />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center gap-2">
                        {getDoshaIcon(patient.dosha)}
                        <span>{patient.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {patient.dosha}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="bg-gradient-healing shadow-glow"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Plan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {generatedPlan && (
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Diet Plan for {generatedPlan.patientName}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    {getDoshaIcon(generatedPlan.dosha)}
                    <span>{generatedPlan.dosha} Constitution</span>
                  </div>
                  <span>•</span>
                  <span>{generatedPlan.duration}</span>
                  <span>•</span>
                  <span>{generatedPlan.totalCalories} cal/day</span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSavePlan}>
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadPlan}>
                  <Share className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="meals" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="meals">Daily Meals</TabsTrigger>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="herbs">Herbs & Supplements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="meals" className="space-y-6">
                {Object.entries(generatedPlan.meals).map(([mealType, meal]) => (
                  <Card key={mealType} className="border border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getMealIcon(mealType)}
                          <div>
                            <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {meal.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {meal.totalCalories} cal
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {meal.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                            <p className="text-xs text-primary italic">{item.ayurvedicNote}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.calories} cal
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="guidelines" className="space-y-4">
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Ayurvedic Guidelines</CardTitle>
                    <CardDescription>
                      Follow these principles for optimal health and dosha balance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {generatedPlan.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                          <p className="text-foreground">{guideline}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="herbs" className="space-y-4">
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Recommended Herbs & Supplements</CardTitle>
                    <CardDescription>
                      Ayurvedic herbs to support your constitution and health goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedPlan.herbs.map((herb, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{herb.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {herb.dosage}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Take {herb.time.toLowerCase()}
                        </p>
                        <p className="text-sm text-primary italic">
                          {herb.benefit}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietGenerator;