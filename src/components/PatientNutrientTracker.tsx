import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Plus, Calculator, AlertTriangle, CheckCircle, Target, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const PatientNutrientTracker = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [trackedMeals, setTrackedMeals] = useState<any[]>([]);

  // Static food data for meal building
  const availableFoods = [
    { id: 1, name: "Basmati Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: "per 100g" },
    { id: 2, name: "Moong Dal", calories: 347, protein: 24, carbs: 59, fat: 1.2, unit: "per 100g" },
    { id: 3, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: "per 100g" },
    { id: 4, name: "Ghee", calories: 902, protein: 0.3, carbs: 0, fat: 100, unit: "per 100g" },
    { id: 5, name: "Roti", calories: 297, protein: 11, carbs: 51, fat: 5.7, unit: "per 100g" },
    { id: 6, name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, unit: "per 100g" }
  ];

  // Patient's daily targets
  const dailyTargets = {
    calories: 2200,
    protein: 150,
    carbs: 275,
    fat: 73
  };

  const addFoodToMeal = () => {
    if (!selectedFood || !quantity) {
      toast({
        title: "Error",
        description: "Please select a food and enter quantity",
        variant: "destructive"
      });
      return;
    }

    const food = availableFoods.find(f => f.id.toString() === selectedFood);
    if (!food) return;

    const quantityNum = parseFloat(quantity);
    const multiplier = quantityNum / 100; // Since nutrition is per 100g

    const mealItem = {
      id: Date.now(),
      name: food.name,
      quantity: quantityNum,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    };

    setTrackedMeals([...trackedMeals, mealItem]);
    setSelectedFood("");
    setQuantity("");

    toast({
      title: "Food Added",
      description: `${food.name} has been added to your meal`,
    });
  };

  const removeFoodFromMeal = (id: number) => {
    setTrackedMeals(trackedMeals.filter(meal => meal.id !== id));
    toast({
      title: "Food Removed",
      description: "Food item has been removed from your meal",
    });
  };

  const calculateTotals = () => {
    return trackedMeals.reduce((totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const totals = calculateTotals();

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage < 80) return "bg-orange-500";
    if (percentage > 120) return "bg-red-500";
    return "bg-green-500";
  };

  const checkDoshaCompatibility = () => {
    // Mock dosha compatibility check
    const incompatibleFoods = trackedMeals.filter(meal => 
      Math.random() > 0.7 // Random for demo
    );

    if (incompatibleFoods.length > 0) {
      return {
        status: "warning",
        message: "Some foods may not be suitable for your Vata dosha",
        suggestions: [
          "Consider reducing cold foods",
          "Add warming spices like ginger"
        ]
      };
    }

    return {
      status: "good",
      message: "This meal combination is suitable for your Vata dosha",
      suggestions: []
    };
  };

  const doshaCheck = checkDoshaCompatibility();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Nutrient & Dosha Tracker
        </h1>
        <p className="text-primary-foreground/80">
          Build your meals and track nutrition with Ayurvedic guidance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Builder */}
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Meal Builder
            </CardTitle>
            <CardDescription>
              Add foods to calculate nutrition and check dosha compatibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="food-select">
                Select Food
              </Label>
              <Select value={selectedFood} onValueChange={setSelectedFood}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a food item" />
                </SelectTrigger>
                <SelectContent>
                  {availableFoods.map((food) => (
                    <SelectItem key={food.id} value={food.id.toString()}>
                      {food.name} ({food.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">
                Quantity (grams)
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <Button onClick={addFoodToMeal} className="w-full hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Add Food
            </Button>

            {/* Current Meal */}
            {trackedMeals.length > 0 && (
              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-3">
                  Current Meal
                </h4>
                <div className="space-y-2">
                  {trackedMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between p-2 bg-background rounded">
                      <div>
                        <span className="font-medium">{meal.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {meal.quantity}g • {meal.calories} cal
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFoodFromMeal(meal.id)}
                        className="hover-scale"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nutrition Summary */}
        <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Nutrition Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Calories</span>
                  <span>{totals.calories} / {dailyTargets.calories}</span>
                </div>
                <Progress 
                  value={(totals.calories / dailyTargets.calories) * 100} 
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Protein (g)</span>
                  <span>{totals.protein.toFixed(1)} / {dailyTargets.protein}</span>
                </div>
                <Progress 
                  value={(totals.protein / dailyTargets.protein) * 100} 
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Carbs (g)</span>
                  <span>{totals.carbs.toFixed(1)} / {dailyTargets.carbs}</span>
                </div>
                <Progress 
                  value={(totals.carbs / dailyTargets.carbs) * 100} 
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fat (g)</span>
                  <span>{totals.fat.toFixed(1)} / {dailyTargets.fat}</span>
                </div>
                <Progress 
                  value={(totals.fat / dailyTargets.fat) * 100} 
                  className="h-2"
                />
              </div>
            </div>

            {trackedMeals.length > 0 && (
              <Button 
                variant="outline" 
                className="w-full hover-scale"
                onClick={() => toast({
                  title: "Meal Saved",
                  description: "Your meal has been saved to daily log"
                })}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Save to Daily Log
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dosha Compatibility Check */}
      {trackedMeals.length > 0 && (
        <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Dosha Compatibility Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${
              doshaCheck.status === 'good' 
                ? 'bg-green-50 border border-green-200 dark:bg-green-900/20' 
                : 'bg-orange-50 border border-orange-200 dark:bg-orange-900/20'
            }`}>
              <div className="flex items-start gap-3">
                {doshaCheck.status === 'good' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium mb-2">{doshaCheck.message}</p>
                  {doshaCheck.suggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Suggestions:
                      </p>
                      <ul className="text-sm space-y-1">
                        {doshaCheck.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientNutrientTracker;