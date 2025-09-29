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
  Coffee,
  Apple
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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

const DietGeneratorEnhanced = () => {
  const { t, language } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const patients = [
    { 
      id: "1", 
      name: "Rajesh Kumar", 
      dosha: "Vata", 
      age: 45,
      description: "Engineer with stress and digestive issues"
    },
    { 
      id: "2", 
      name: "Priya Verma", 
      dosha: "Pitta", 
      age: 32,
      description: "Marketing executive with acidity and skin problems"
    },
    { 
      id: "3", 
      name: "Amit Singh", 
      dosha: "Kapha", 
      age: 38,
      description: "Teacher with weight gain and low energy"
    }
  ];

  const dietPlans = {
    "1": { // Vata
      patientName: "Rajesh Kumar",
      dosha: "Vata",
      duration: "7 days",
      totalCalories: 1900,
      meals: {
        breakfast: {
          time: "7:00 AM",
          items: [
            { name: "गर्म दलिया with Ghee", quantity: "1 cup", calories: 320, ayurvedicNote: "Nourishing, grounding for Vata" },
            { name: "हल्दी दूध (Turmeric Milk)", quantity: "1 glass", calories: 150, ayurvedicNote: "Warming, anti-inflammatory" },
            { name: "खजूर और बादाम", quantity: "3 dates, 5 almonds", calories: 180, ayurvedicNote: "Natural sweetness, healthy fats" }
          ],
          totalCalories: 650
        },
        lunch: {
          time: "12:30 PM",
          items: [
            { name: "खिचड़ी with vegetables", quantity: "1.5 cups", calories: 450, ayurvedicNote: "Easy to digest, tri-doshic" },
            { name: "गाय का घी", quantity: "1 tbsp", calories: 120, ayurvedicNote: "Essential for Vata nourishment" },
            { name: "छाछ (Buttermilk)", quantity: "1 glass", calories: 80, ayurvedicNote: "Aids digestion, cooling" },
            { name: "हरी सब्जी curry", quantity: "1/2 cup", calories: 100, ayurvedicNote: "Cooked vegetables for Vata" }
          ],
          totalCalories: 750
        },
        evening: {
          time: "4:00 PM",
          items: [
            { name: "अदरक चाय (Ginger Tea)", quantity: "1 cup", calories: 25, ayurvedicNote: "Digestive, warming" },
            { name: "मखाना roasted", quantity: "1/4 cup", calories: 90, ayurvedicNote: "Light, satisfying snack" }
          ],
          totalCalories: 115
        },
        dinner: {
          time: "7:30 PM",
          items: [
            { name: "रोटी (Whole wheat)", quantity: "2 pieces", calories: 200, ayurvedicNote: "Grounding carbohydrates" },
            { name: "मूंग दाल", quantity: "1 bowl", calories: 180, ayurvedicNote: "Easy protein for Vata" },
            { name: "लौकी sabzi", quantity: "1/2 cup", calories: 50, ayurvedicNote: "Light, easy to digest" },
            { name: "गुड़ (Jaggery)", quantity: "1 piece", calories: 40, ayurvedicNote: "Natural sweet, grounding" }
          ],
          totalCalories: 470
        }
      },
      guidelines: [
        "गर्म और पका हुआ खाना खाएं (Eat warm, cooked foods)",
        "नियमित समय पर भोजन करें (Maintain regular meal times)",
        "घी और तेल का उपयोग करें (Include healthy fats)",
        "ठंडा और कच्चा खाना न खाएं (Avoid cold, raw foods)",
        "गर्म पानी पिएं (Drink warm water)"
      ],
      herbs: [
        { name: "अश्वगंधा (Ashwagandha)", dosage: "500mg", time: "सोने से पहले", benefit: "Stress relief, energy" },
        { name: "त्रिफला (Triphala)", dosage: "1 tsp", time: "रात को गर्म पानी के साथ", benefit: "Digestion, detox" }
      ]
    },
    "2": { // Pitta
      patientName: "Priya Verma",
      dosha: "Pitta",
      duration: "7 days",
      totalCalories: 1750,
      meals: {
        breakfast: {
          time: "7:30 AM",
          items: [
            { name: "ठंडा दलिया with Coconut", quantity: "1 cup", calories: 280, ayurvedicNote: "Cooling, soothing for Pitta" },
            { name: "नारियल पानी", quantity: "1 glass", calories: 45, ayurvedicNote: "Natural coolant, electrolytes" },
            { name: "मिश्री (Rock sugar)", quantity: "1 tsp", calories: 20, ayurvedicNote: "Cooling sweetener" }
          ],
          totalCalories: 345
        },
        lunch: {
          time: "1:00 PM",
          items: [
            { name: "बासमती चावल", quantity: "1 cup", calories: 200, ayurvedicNote: "Cooling grain for Pitta" },
            { name: "मूंग दाल", quantity: "1 bowl", calories: 180, ayurvedicNote: "Cooling protein" },
            { name: "खीरा-टमाटर salad", quantity: "1 bowl", calories: 50, ayurvedicNote: "Cooling vegetables" },
            { name: "दही (Yogurt)", quantity: "1/2 cup", calories: 80, ayurvedicNote: "Cooling, probiotic" },
            { name: "पुदीना चटनी", quantity: "1 tbsp", calories: 15, ayurvedicNote: "Cooling, digestive" }
          ],
          totalCalories: 525
        },
        evening: {
          time: "4:30 PM",
          items: [
            { name: "गुलाब शर्बत", quantity: "1 glass", calories: 60, ayurvedicNote: "Cooling, calming Pitta" },
            { name: "नारियल laddu", quantity: "1 piece", calories: 120, ayurvedicNote: "Sweet, cooling" }
          ],
          totalCalories: 180
        },
        dinner: {
          time: "8:00 PM",
          items: [
            { name: "रोटी (Whole wheat)", quantity: "2 pieces", calories: 200, ayurvedicNote: "Light carbohydrates" },
            { name: "पालक paneer", quantity: "1/2 cup", calories: 180, ayurvedicNote: "Cooling greens, protein" },
            { name: "खीरा raita", quantity: "1/2 cup", calories: 60, ayurvedicNote: "Cooling, digestive" },
            { name: "मिश्री", quantity: "1 tsp", calories: 20, ayurvedicNote: "Cooling finish" }
          ],
          totalCalories: 460
        }
      },
      guidelines: [
        "ठंडा और ताजा खाना पसंद करें (Prefer cool, fresh foods)",
        "मसालेदार और तीखा खाना कम करें (Reduce spicy, hot foods)",
        "नारियल पानी और दही शामिल करें (Include coconut water and yogurt)",
        "दोपहर की धूप से बचें (Avoid midday sun)",
        "मीठे और कड़वे स्वाद लें (Include sweet and bitter tastes)"
      ],
      herbs: [
        { name: "आंवला (Amla)", dosage: "1 tsp powder", time: "सुबह ठंडे पानी के साथ", benefit: "Vitamin C, cooling" },
        { name: "गुलकंद", dosage: "1 tsp", time: "भोजन के बाद", benefit: "Cooling, digestive" }
      ]
    },
    "3": { // Kapha
      patientName: "Amit Singh",
      dosha: "Kapha",
      duration: "7 days",
      totalCalories: 1600,
      meals: {
        breakfast: {
          time: "6:30 AM",
          items: [
            { name: "उपमा with vegetables", quantity: "1 cup", calories: 250, ayurvedicNote: "Light, warming for Kapha" },
            { name: "अदरक-शहद चाय", quantity: "1 cup", calories: 35, ayurvedicNote: "Warming, metabolism boost" },
            { name: "मुनक्का (Raisins)", quantity: "10 pieces", calories: 30, ayurvedicNote: "Natural energy" }
          ],
          totalCalories: 315
        },
        lunch: {
          time: "12:00 PM",
          items: [
            { name: "बाजरा रोटी", quantity: "2 pieces", calories: 220, ayurvedicNote: "Warming grain, light" },
            { name: "तुअर दाल with spices", quantity: "3/4 cup", calories: 150, ayurvedicNote: "Protein with warming spices" },
            { name: "करेला sabzi", quantity: "1/2 cup", calories: 35, ayurvedicNote: "Bitter taste, reduces Kapha" },
            { name: "अजवाइन-जीरा पानी", quantity: "1 glass", calories: 5, ayurvedicNote: "Digestive, warming" }
          ],
          totalCalories: 410
        },
        evening: {
          time: "4:00 PM",
          items: [
            { name: "मसाला चाय", quantity: "1 cup", calories: 50, ayurvedicNote: "Warming spices, energizing" },
            { name: "भुने चने", quantity: "1/4 cup", calories: 90, ayurvedicNote: "Protein, crunchy texture" }
          ],
          totalCalories: 140
        },
        dinner: {
          time: "7:00 PM",
          items: [
            { name: "ज्वार रोटी", quantity: "2 pieces", calories: 200, ayurvedicNote: "Light, warming grain" },
            { name: "राजमा curry", quantity: "3/4 cup", calories: 180, ayurvedicNote: "Protein with warming spices" },
            { name: "गाजर-मूली salad", quantity: "1/2 cup", calories: 25, ayurvedicNote: "Raw vegetables aid digestion" },
            { name: "हल्दी दूध", quantity: "1/2 glass", calories: 70, ayurvedicNote: "Anti-inflammatory, warming" }
          ],
          totalCalories: 475
        }
      },
      guidelines: [
        "गर्म और मसालेदार खाना लें (Eat warm, spiced foods)",
        "कम मात्रा में भोजन करें (Eat smaller portions)",
        "तीखे और कड़वे स्वाद शामिल करें (Include pungent and bitter tastes)",
        "सुबह जल्दी उठें और व्यायाम करें (Wake early, exercise)",
        "ठंडे और भारी खाने से बचें (Avoid cold, heavy foods)"
      ],
      herbs: [
        { name: "गुग्गुल", dosage: "250mg", time: "सुबह गर्म पानी के साथ", benefit: "Metabolism, weight management" },
        { name: "तुलसी (Holy Basil)", dosage: "5-7 leaves", time: "सुबह खाली पेट", benefit: "Respiratory health, immunity" }
      ]
    }
  };

  const translateFoodName = (name: string, currentLanguage: string) => {
    if (currentLanguage === 'English') {
      const translations: { [key: string]: string } = {
        'गर्म दलिया with Ghee': 'Warm Porridge with Ghee',
        'हल्दी दूध (Turmeric Milk)': 'Turmeric Milk',
        'खजूर और बादाम': 'Dates and Almonds',
        'खिचड़ी with vegetables': 'Khichdi with vegetables',
        'गाय का घी': 'Cow Ghee',
        'छाछ (Buttermilk)': 'Buttermilk',
        'हरी सब्जी curry': 'Green Vegetable Curry',
        'अदरक चाय (Ginger Tea)': 'Ginger Tea',
        'मखाना roasted': 'Roasted Fox Nuts',
        'रोटी (Whole wheat)': 'Wheat Roti',
        'मूंग दाल': 'Moong Dal',
        'लौकी sabzi': 'Bottle Gourd Curry',
        'गुड़ (Jaggery)': 'Jaggery',
        'ठंडा दलिया with Coconut': 'Cold Porridge with Coconut',
        'नारियल पानी': 'Coconut Water',
        'मिश्री (Rock sugar)': 'Rock Sugar',
        'बासमती चावल': 'Basmati Rice',
        'खीरा-टमाटर salad': 'Cucumber-Tomato Salad',
        'दही (Yogurt)': 'Yogurt',
        'पुदीना चटनी': 'Mint Chutney',
        'गुलाब शर्बत': 'Rose Sherbet',
        'नारियल laddu': 'Coconut Laddu',
        'पालक paneer': 'Spinach Paneer',
        'खीरा raita': 'Cucumber Raita',
        'उपमा with vegetables': 'Upma with vegetables',
        'अदरक-शहद चाय': 'Ginger-Honey Tea',
        'मुनक्का (Raisins)': 'Raisins',
        'बाजरा रोटी': 'Millet Roti',
        'तुअर दाल with spices': 'Tuvar Dal with spices',
        'करेला sabzi': 'Bitter Gourd Curry',
        'अजवाइन-जीरा पानी': 'Carom-Cumin Water',
        'मसाला चाय': 'Masala Tea',
        'भुने चने': 'Roasted Gram',
        'ज्वार रोटी': 'Jowar Roti',
        'राजमा curry': 'Kidney Bean Curry',
        'गाजर-मूली salad': 'Carrot-Radish Salad',
        'हल्दी दूध': 'Turmeric Milk'
      };
      return translations[name] || name;
    }
    return name;
  };

  const handleGeneratePlan = async () => {
    if (!selectedPatient) {
      toast({
        title: t('diet.selectPatient'),
        description: "Please select a patient to generate a diet plan",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const basePlan = dietPlans[selectedPatient as keyof typeof dietPlans];
      const translatedPlan = {
        ...basePlan,
        meals: Object.entries(basePlan.meals).reduce((acc, [key, meal]) => ({
          ...acc,
          [key]: {
            ...meal,
            items: meal.items.map(item => ({
              ...item,
              name: translateFoodName(item.name, language)
            }))
          }
        }), {})
      };
      setGeneratedPlan(translatedPlan);
      setIsGenerating(false);
      toast({
        title: "Diet Plan Generated!",
        description: `Personalized Ayurvedic diet plan created for ${basePlan.patientName}`,
      });
    }, 2500);
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

  const getMealName = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return t('diet.breakfast');
      case 'lunch': return t('diet.lunch');
      case 'evening': return t('diet.evening');
      case 'dinner': return t('diet.dinner');
      default: return mealType;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('diet.title')}</h1>
          <p className="text-muted-foreground">{t('diet.subtitle')}</p>
        </div>
      </div>

      {/* Generator Section */}
      <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            {t('diet.title')}
          </CardTitle>
          <CardDescription>
            {t('diet.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">{t('diet.selectPatient')}</label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="hover-scale">
                  <SelectValue placeholder="Choose a patient..." />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-medium">
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getDoshaIcon(patient.dosha)}
                            <span className="font-medium">{patient.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {patient.dosha}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {patient.description}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="bg-gradient-healing shadow-glow hover-scale"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  {t('diet.generating')}
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  {t('diet.generatePlan')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {generatedPlan && (
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur animate-scale-in">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t('diet.planFor')} {generatedPlan.patientName}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    {getDoshaIcon(generatedPlan.dosha)}
                    <span>{generatedPlan.dosha} {t('diet.constitution')}</span>
                  </div>
                  <span>•</span>
                  <span>{generatedPlan.duration}</span>
                  <span>•</span>
                  <span>{generatedPlan.totalCalories} {t('diet.caloriesPerDay')}</span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSavePlan} className="hover-scale">
                  <Download className="w-4 h-4 mr-2" />
                  {t('diet.savePlan')}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadPlan} className="hover-scale">
                  <Share className="w-4 h-4 mr-2" />
                  {t('diet.downloadPdf')}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="meals" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="meals">{t('diet.dailyMeals')}</TabsTrigger>
                <TabsTrigger value="guidelines">{t('diet.guidelines')}</TabsTrigger>
                <TabsTrigger value="herbs">{t('diet.herbs')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="meals" className="space-y-6">
                {Object.entries(generatedPlan.meals).map(([mealType, meal]) => (
                  <Card key={mealType} className="border border-border/50 hover:shadow-card transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getMealIcon(mealType)}
                          <div>
                            <CardTitle className="text-lg capitalize">{getMealName(mealType)}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {meal.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="hover-scale">
                          {meal.totalCalories} cal
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {meal.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}</p>
                            <p className="text-xs text-primary italic mt-1">{item.ayurvedicNote}</p>
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
                        <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all">
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
                      <div key={index} className="p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all hover-scale">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground flex items-center gap-2">
                            <Apple className="w-4 h-4 text-success" />
                            {herb.name}
                          </h4>
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

export default DietGeneratorEnhanced;