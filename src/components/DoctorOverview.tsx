import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Clock,
  Star,
  Activity,
  FileText,
  Plus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DoctorOverviewProps {
  setActiveModule?: (module: string) => void;
}

const DoctorOverview = ({ setActiveModule }: DoctorOverviewProps) => {
  const { t } = useLanguage();
  const stats = [
    { title: t('stats.totalPatients'), value: "127", change: "+12%", icon: Users, color: "text-primary" },
    { title: t('stats.dietPlansCreated'), value: "89", change: "+8%", icon: FileText, color: "text-success" },
    { title: t('stats.consultations'), value: "34", change: "+23%", icon: Calendar, color: "text-warning" },
    { title: t('stats.successRate'), value: "94%", change: "+2%", icon: TrendingUp, color: "text-accent-gold" },
  ];

  const recentPatients = [
    { name: "Rajesh Kumar", dosha: "Vata", lastVisit: "2 days ago", status: "Active" },
    { name: "Priya Verma", dosha: "Pitta", lastVisit: "5 days ago", status: "Following Plan" },
    { name: "Amit Singh", dosha: "Kapha", lastVisit: "1 week ago", status: "Review Needed" },
  ];

  const quickActions = [
    { title: t('actions.addNewPatient'), icon: Users, action: "patients", color: "bg-primary" },
    { title: t('actions.generateDietPlan'), icon: Heart, action: "diet-generator", color: "bg-success" },
    { title: t('actions.viewReports'), icon: Activity, action: "reports", color: "bg-warning" },
    { title: t('actions.foodDatabase'), icon: FileText, action: "food-database", color: "bg-accent-gold" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-healing rounded-lg p-6 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('dashboard.welcome')}</h1>
            <p className="text-primary-foreground/90 mb-4">
              {t('dashboard.appointments')}
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                {t('dashboard.viewSchedule')}
              </Button>
              <Button variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Plus className="w-4 h-4 mr-2" />
                {t('dashboard.quickActions')}
              </Button>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary-foreground/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card border-0 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t('stats.recentPatients')}
            </CardTitle>
            <CardDescription>
              Latest patient interactions and status updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Dosha: {patient.dosha} • {patient.lastVisit}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={patient.status === "Active" ? "default" : patient.status === "Following Plan" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {patient.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Patients
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-gold" />
              {t('dashboard.quickActions')}
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-glow transition-all"
                onClick={() => setActiveModule && setActiveModule(action.action)}
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-center">{action.title}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              {t('stats.monthlyProgress')}
            </CardTitle>
          <CardDescription>
            Your performance metrics for this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Patient Consultations</span>
              <span>34/40</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Diet Plans Created</span>
              <span>89/100</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Follow-up Appointments</span>
              <span>23/30</span>
            </div>
            <Progress value={77} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorOverview;