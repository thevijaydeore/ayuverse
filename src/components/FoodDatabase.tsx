import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Database, Plus, Leaf, Flame, Droplets } from "lucide-react";

const FoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const foodItems = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      // Ayurvedic properties
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Light, Soft",
      doshaEffect: { vata: "Balances", pitta: "Balances", kapha: "Increases" },
      description: "Easily digestible grain, good for all doshas when consumed in moderation"
    },
    {
      id: 2,
      name: "Turmeric",
      category: "Spices",
      calories: 24,
      protein: 0.9,
      carbs: 4.4,
      fat: 0.7,
      fiber: 1.4,
      rasa: "Bitter, Pungent",
      virya: "Heating",
      vipaka: "Pungent",
      guna: "Light, Dry",
      doshaEffect: { vata: "Balances", pitta: "Increases", kapha: "Reduces" },
      description: "Powerful anti-inflammatory herb, excellent for joint health and digestion"
    },
    {
      id: 3,
      name: "Ghee",
      category: "Fats",
      calories: 112,
      protein: 0,
      carbs: 0,
      fat: 12.8,
      fiber: 0,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Heavy, Oily",
      doshaEffect: { vata: "Reduces", pitta: "Reduces", kapha: "Increases" },
      description: "Sacred clarified butter, enhances digestion and nourishes all tissues"
    },
    {
      id: 4,
      name: "Ginger",
      category: "Spices",
      calories: 4,
      protein: 0.1,
      carbs: 0.9,
      fat: 0,
      fiber: 0.1,
      rasa: "Pungent",
      virya: "Heating",
      vipaka: "Sweet",
      guna: "Light, Oily",
      doshaEffect: { vata: "Reduces", pitta: "Increases", kapha: "Reduces" },
      description: "Universal medicine for digestion, reduces inflammation and enhances circulation"
    },
    {
      id: 5,
      name: "Coconut",
      category: "Fruits",
      calories: 159,
      protein: 1.5,
      carbs: 6.8,
      fat: 15.1,
      fiber: 4.0,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      guna: "Heavy, Oily",
      doshaEffect: { vata: "Reduces", pitta: "Reduces", kapha: "Increases" },
      description: "Cooling and nourishing fruit, excellent for pitta constitution"
    }
  ];

  const categories = ["all", "Grains", "Spices", "Fats", "Fruits", "Vegetables", "Legumes"];

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case "vata": return <Leaf className="w-3 h-3" />;
      case "pitta": return <Flame className="w-3 h-3" />;
      case "kapha": return <Droplets className="w-3 h-3" />;
      default: return null;
    }
  };

  const getDoshaColor = (effect: string) => {
    switch (effect) {
      case "Reduces": return "text-success bg-success/10";
      case "Balances": return "text-primary bg-primary/10";
      case "Increases": return "text-warning bg-warning/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Food & Recipe Database</h1>
          <p className="text-muted-foreground">Comprehensive database with nutritional and Ayurvedic properties</p>
        </div>
        <Button className="bg-gradient-healing shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Food Item
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{food.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {food.category}
                    </Badge>
                    <span>Per 100g serving</span>
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="nutrition" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="ayurveda">Ayurveda</TabsTrigger>
                </TabsList>
                
                <TabsContent value="nutrition" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{food.calories}</p>
                      <p className="text-xs text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{food.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{food.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold text-foreground">{food.fat}g</p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ayurveda" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rasa (Taste):</span>
                      <Badge variant="outline">{food.rasa}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Virya (Energy):</span>
                      <Badge variant="outline">{food.virya}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Vipaka (Post-digestive):</span>
                      <Badge variant="outline">{food.vipaka}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Guna (Qualities):</span>
                      <Badge variant="outline">{food.guna}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Dosha Effects:</p>
                    <div className="flex gap-2">
                      {Object.entries(food.doshaEffect).map(([dosha, effect]) => (
                        <Badge 
                          key={dosha} 
                          className={`text-xs capitalize ${getDoshaColor(effect)}`}
                        >
                          <span className="flex items-center gap-1">
                            {getDoshaIcon(dosha)}
                            {dosha}: {effect}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground italic">
                    {food.description}
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur text-center py-12">
          <CardContent>
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-lg mb-2">No Foods Found</CardTitle>
            <CardDescription>
              {searchTerm ? "Try adjusting your search terms or category filter" : "The food database is empty"}
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodDatabase;