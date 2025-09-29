import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Utensils, 
  Leaf, 
  Flame, 
  Droplets,
  Filter,
  Save,
  X
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const FoodDatabaseEnhanced = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddingFood, setIsAddingFood] = useState(false);
  
  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    fiber: "",
    rasa: "",
    virya: "",
    vipaka: "",
    doshaEffect: ""
  });

  const foodItems = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "grains",
      image: "🍚",
      description: "Premium long-grain rice with aromatic fragrance",
      nutrition: {
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fats: 0.3,
        fiber: 0.4
      },
      ayurveda: {
        rasa: "Sweet",
        virya: "Cooling",
        vipaka: "Sweet",
        doshaEffect: "Balances Pitta, may increase Kapha"
      }
    },
    {
      id: 2,
      name: "Turmeric",
      category: "spices",
      image: "🧄",
      description: "Golden spice with powerful anti-inflammatory properties",
      nutrition: {
        calories: 29,
        protein: 0.9,
        carbs: 6.3,
        fats: 0.3,
        fiber: 2.1
      },
      ayurveda: {
        rasa: "Bitter, Pungent",
        virya: "Heating",
        vipaka: "Pungent",
        doshaEffect: "Balances all doshas, especially Kapha"
      }
    },
    {
      id: 3,
      name: "Mung Dal",
      category: "grains",
      image: "🫘",
      description: "Split mung beans, easy to digest protein source",
      nutrition: {
        calories: 347,
        protein: 24.5,
        carbs: 59,
        fats: 1.2,
        fiber: 16.3
      },
      ayurveda: {
        rasa: "Sweet, Astringent",
        virya: "Cooling",
        vipaka: "Sweet",
        doshaEffect: "Tridoshic - balances all doshas"
      }
    },
    {
      id: 4,
      name: "Spinach",
      category: "vegetables",
      image: "🥬",
      description: "Iron-rich leafy green vegetable",
      nutrition: {
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fats: 0.4,
        fiber: 2.2
      },
      ayurveda: {
        rasa: "Sweet, Bitter",
        virya: "Cooling",
        vipaka: "Sweet",
        doshaEffect: "Good for Pitta, may increase Vata"
      }
    },
    {
      id: 5,
      name: "Ghee",
      category: "dairy",
      image: "🧈",
      description: "Clarified butter, excellent for Vata constitution",
      nutrition: {
        calories: 900,
        protein: 0,
        carbs: 0,
        fats: 100,
        fiber: 0
      },
      ayurveda: {
        rasa: "Sweet",
        virya: "Cooling",
        vipaka: "Sweet",
        doshaEffect: "Excellent for Vata, good for Pitta"
      }
    },
    {
      id: 6,
      name: "Mango",
      category: "fruits",
      image: "🥭",
      description: "Sweet tropical fruit rich in vitamins",
      nutrition: {
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fats: 0.4,
        fiber: 1.6
      },
      ayurveda: {
        rasa: "Sweet",
        virya: "Cooling",
        vipaka: "Sweet",
        doshaEffect: "Good for Vata and Pitta, may increase Kapha"
      }
    }
  ];

  const categories = [
    { id: "all", name: t('food.allCategories'), icon: "🍽️" },
    { id: "grains", name: t('food.grains'), icon: "🌾" },
    { id: "vegetables", name: t('food.vegetables'), icon: "🥕" },
    { id: "fruits", name: t('food.fruits'), icon: "🍎" },
    { id: "spices", name: t('food.spices'), icon: "🌶️" },
    { id: "dairy", name: t('food.dairy'), icon: "🥛" }
  ];

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaIcon = (dosha: string) => {
    if (dosha.toLowerCase().includes('vata')) return <Leaf className="w-4 h-4 text-success" />;
    if (dosha.toLowerCase().includes('pitta')) return <Flame className="w-4 h-4 text-destructive" />;
    if (dosha.toLowerCase().includes('kapha')) return <Droplets className="w-4 h-4 text-primary" />;
    return <Utensils className="w-4 h-4" />;
  };

  const handleAddFood = () => {
    if (newFood.name && newFood.category) {
      toast({
        title: "Food Added!",
        description: `${newFood.name} has been added to the database`,
      });
      
      // Reset form
      setNewFood({
        name: "",
        category: "",
        description: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        fiber: "",
        rasa: "",
        virya: "",
        vipaka: "",
        doshaEffect: ""
      });
      setIsAddingFood(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('food.title')}</h1>
          <p className="text-muted-foreground">{t('food.subtitle')}</p>
        </div>
        <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-healing shadow-glow hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              {t('food.addFoodItem')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('food.addNewFood')}</DialogTitle>
              <DialogDescription>
                Add nutritional and Ayurvedic information for a new food item
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="foodName">{t('food.foodName')} *</Label>
                <Input
                  id="foodName"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  placeholder="Enter food name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{t('food.category')} *</Label>
                <Select value={newFood.category} onValueChange={(value) => setNewFood({ ...newFood, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">{t('food.description')}</Label>
                <Textarea
                  id="description"
                  value={newFood.description}
                  onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                  placeholder="Brief description of the food item"
                  className="h-20"
                />
              </div>
              
              {/* Nutritional Information */}
              <div className="md:col-span-2">
                <h4 className="font-medium text-foreground mb-3">{t('food.nutritionalInfo')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.calories')}</Label>
                    <Input
                      type="number"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                      placeholder="kcal"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.protein')}</Label>
                    <Input
                      type="number"
                      value={newFood.protein}
                      onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                      placeholder="g"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.carbs')}</Label>
                    <Input
                      type="number"
                      value={newFood.carbs}
                      onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                      placeholder="g"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.fats')}</Label>
                    <Input
                      type="number"
                      value={newFood.fats}
                      onChange={(e) => setNewFood({ ...newFood, fats: e.target.value })}
                      placeholder="g"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.fiber')}</Label>
                    <Input
                      type="number"
                      value={newFood.fiber}
                      onChange={(e) => setNewFood({ ...newFood, fiber: e.target.value })}
                      placeholder="g"
                    />
                  </div>
                </div>
              </div>

              {/* Ayurvedic Properties */}
              <div className="md:col-span-2">
                <h4 className="font-medium text-foreground mb-3">{t('food.ayurvedicProperties')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.rasa')}</Label>
                    <Input
                      value={newFood.rasa}
                      onChange={(e) => setNewFood({ ...newFood, rasa: e.target.value })}
                      placeholder="Sweet, Sour, Salty..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.virya')}</Label>
                    <Select value={newFood.virya} onValueChange={(value) => setNewFood({ ...newFood, virya: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select potency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Heating">Heating</SelectItem>
                        <SelectItem value="Cooling">Cooling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.vipaka')}</Label>
                    <Input
                      value={newFood.vipaka}
                      onChange={(e) => setNewFood({ ...newFood, vipaka: e.target.value })}
                      placeholder="Sweet, Sour, Pungent"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('food.doshaEffect')}</Label>
                    <Input
                      value={newFood.doshaEffect}
                      onChange={(e) => setNewFood({ ...newFood, doshaEffect: e.target.value })}
                      placeholder="Effect on Vata, Pitta, Kapha"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddingFood(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleAddFood} className="bg-gradient-healing">
                <Save className="w-4 h-4 mr-2" />
                {t('food.save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('food.searchFood')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <Card 
            key={food.id} 
            className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all hover-scale"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{food.image}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{food.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {food.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {categories.find(c => c.id === food.category)?.name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="nutrition" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="nutrition" className="text-xs">
                    {t('food.nutritionalInfo')}
                  </TabsTrigger>
                  <TabsTrigger value="ayurveda" className="text-xs">
                    {t('food.ayurvedicProperties')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="nutrition" className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('food.calories')}:</span>
                      <span className="font-medium">{food.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('food.protein')}:</span>
                      <span className="font-medium">{food.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('food.carbs')}:</span>
                      <span className="font-medium">{food.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('food.fats')}:</span>
                      <span className="font-medium">{food.nutrition.fats}g</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ayurveda" className="space-y-3 mt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('food.rasa')}:</span>
                      <Badge variant="outline" className="text-xs">
                        {food.ayurveda.rasa}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('food.virya')}:</span>
                      <Badge 
                        variant={food.ayurveda.virya === 'Heating' ? 'destructive' : 'secondary'} 
                        className="text-xs"
                      >
                        {food.ayurveda.virya}
                      </Badge>
                    </div>
                    <div className="p-2 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-2">
                        {getDoshaIcon(food.ayurveda.doshaEffect)}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{t('food.doshaEffect')}:</p>
                          <p className="text-xs text-foreground">{food.ayurveda.doshaEffect}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur text-center py-12">
          <CardContent>
            <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-lg mb-2">No Foods Found</CardTitle>
            <CardDescription>
              {searchTerm ? "Try adjusting your search terms or filters" : "Start by adding your first food item"}
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodDatabaseEnhanced;