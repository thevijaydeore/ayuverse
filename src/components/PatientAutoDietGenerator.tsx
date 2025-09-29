import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Utensils, Target, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientAutoDietGenerator = () => {
  const { toast } = useToast();
  const [healthGoal, setHealthGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const generateDietPlan = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan({
        title: "7-Day Vata Balancing Plan",
        goal: healthGoal,
        meals: [
          { time: "Breakfast", items: ["Warm Oatmeal", "Ghee", "Dates"] },
          { time: "Lunch", items: ["Khichdi", "Vegetables", "Buttermilk"] },
          { time: "Dinner", items: ["Roti", "Dal", "Warm Milk"] }
        ]
      });
      setIsGenerating(false);
      toast({
        title: "Diet Plan Generated",
        description: "Your personalized Ayurvedic diet plan is ready!"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="w-6 h-6" />
          AI Diet Suggestions
        </h1>
        <p className="text-primary-foreground/80">
          Get personalized Ayurvedic diet recommendations based on your health goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Diet Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Your Health Goal</label>
              <Select value={healthGoal} onValueChange={setHealthGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="energy-boost">Energy Boost</SelectItem>
                  <SelectItem value="balanced-diet">Balanced Diet</SelectItem>
                  <SelectItem value="digestion">Improve Digestion</SelectItem>
                  <SelectItem value="immunity">Boost Immunity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateDietPlan} 
              disabled={!healthGoal || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Utensils className="w-4 h-4 mr-2" />
                  Generate Diet Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {generatedPlan.title}
                <Badge>{generatedPlan.goal}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedPlan.meals.map((meal: any, index: number) => (
                  <div key={index} className="p-3 bg-accent/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">{meal.time}</h4>
                    <div className="flex flex-wrap gap-1">
                      {meal.items.map((item: string, itemIndex: number) => (
                        <Badge key={itemIndex} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4">
                  Save This Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientAutoDietGenerator;