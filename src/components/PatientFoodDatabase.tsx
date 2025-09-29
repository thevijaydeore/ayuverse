import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Leaf, Activity, Flame, Droplets, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const PatientFoodDatabase = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Static food database - same as doctor dashboard
  const foodItems = [
    {
      id: 1,
      name: "Basmati Rice",
      hindi: "बासमती चावल",
      category: "grains",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Light, Dry",
      doshaEffect: { vata: "increase", pitta: "decrease", kapha: "increase" }
    },
    {
      id: 2,
      name: "Moong Dal",
      hindi: "मूंग दाल",
      category: "legumes",
      calories: 347,
      protein: 24,
      carbs: 59,
      fat: 1.2,
      fiber: 16.3,
      rasa: "Sweet, Astringent",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Light, Dry",
      doshaEffect: { vata: "neutral", pitta: "decrease", kapha: "decrease" }
    },
    {
      id: 3,
      name: "Spinach",
      hindi: "पालक",
      category: "vegetables",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      rasa: "Sweet, Bitter, Astringent",
      virya: "Cooling",
      vipaka: "Pungent",
      guna: "Light, Dry",
      doshaEffect: { vata: "increase", pitta: "decrease", kapha: "decrease" }
    },
    {
      id: 4,
      name: "Ghee",
      hindi: "घी",
      category: "fats",
      calories: 902,
      protein: 0.3,
      carbs: 0,
      fat: 100,
      fiber: 0,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Unctuous, Heavy",
      doshaEffect: { vata: "decrease", pitta: "decrease", kapha: "increase" }
    },
    {
      id: 5,
      name: "Turmeric",
      hindi: "हल्दी",
      category: "spices",
      calories: 354,
      protein: 7.8,
      carbs: 65,
      fat: 10,
      fiber: 21,
      rasa: "Bitter, Pungent",
      virya: "Heating",
      vipaka: "Pungent",
      guna: "Light, Dry",
      doshaEffect: { vata: "neutral", pitta: "increase", kapha: "decrease" }
    },
    {
      id: 6,
      name: "Almonds",
      hindi: "बादाम",
      category: "nuts",
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      rasa: "Sweet",
      virya: "Heating",
      vipaka: "Sweet",
      guna: "Heavy, Unctuous",
      doshaEffect: { vata: "decrease", pitta: "increase", kapha: "increase" }
    }
  ];

  const categories = [
    { value: "all", label: t('foodDatabase.categories.all') || "All Categories" },
    { value: "grains", label: t('foodDatabase.categories.grains') || "Grains" },
    { value: "legumes", label: t('foodDatabase.categories.legumes') || "Legumes" },
    { value: "vegetables", label: t('foodDatabase.categories.vegetables') || "Vegetables" },
    { value: "fruits", label: t('foodDatabase.categories.fruits') || "Fruits" },
    { value: "spices", label: t('foodDatabase.categories.spices') || "Spices" },
    { value: "nuts", label: t('foodDatabase.categories.nuts') || "Nuts & Seeds" },
    { value: "fats", label: t('foodDatabase.categories.fats') || "Fats & Oils" },
  ];

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.hindi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaIcon = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return <Activity className="w-3 h-3" />;
      case 'pitta': return <Flame className="w-3 h-3" />;
      case 'kapha': return <Droplets className="w-3 h-3" />;
      default: return <Target className="w-3 h-3" />;
    }
  };

  const getDoshaEffectColor = (effect: string) => {
    switch (effect) {
      case 'increase': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'decrease': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const addToMeal = (food: any) => {
    toast({
      title: "Added to Meal",
      description: `${food.name} has been added to your meal tracker`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Search className="w-6 h-6" />
          Food & Recipe Database
        </h1>
        <p className="text-primary-foreground/80">
          Explore Ayurvedic foods with detailed nutritional and medicinal properties
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('patient.foodDatabase.searchPlaceholder') || "Search foods by name or Hindi name..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food, index) => (
          <Card key={food.id} className="hover-scale transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{food.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {food.hindi}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addToMeal(food)}
                  className="hover-scale flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs defaultValue="nutrition" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-8">
                  <TabsTrigger value="nutrition" className="text-xs px-2">
                    Nutrition
                  </TabsTrigger>
                  <TabsTrigger value="ayurveda" className="text-xs px-2">
                    Ayurveda
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="nutrition" className="space-y-2 mt-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calories:</span>
                      <span className="font-medium">{food.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="font-medium">{food.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="font-medium">{food.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="font-medium">{food.fat}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiber:</span>
                      <span className="font-medium">{food.fiber}g</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ayurveda" className="space-y-2 mt-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rasa:</span>
                      <span className="font-medium text-right flex-1 ml-2 break-words">{food.rasa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Virya:</span>
                      <span className="font-medium">{food.virya}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vipaka:</span>
                      <span className="font-medium">{food.vipaka}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guna:</span>
                      <span className="font-medium text-right flex-1 ml-2 break-words">{food.guna}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Dosha Effects:
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(food.doshaEffect).map(([dosha, effect]) => (
                        <Badge
                          key={dosha}
                          variant="outline"
                          className={`text-xs ${getDoshaEffectColor(effect)} flex items-center gap-1`}
                        >
                          {getDoshaIcon(dosha)}
                          <span className="capitalize">{dosha}</span>
                          <span>{effect === 'increase' ? '↑' : effect === 'decrease' ? '↓' : '→'}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {t('patient.foodDatabase.noResults') || "No foods found"}
          </h3>
          <p className="text-muted-foreground">
            {t('patient.foodDatabase.noResultsDesc') || "Try adjusting your search terms or category filter"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientFoodDatabase;