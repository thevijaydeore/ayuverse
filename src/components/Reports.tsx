import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Reports = () => {
  const { t } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  const dietPlans = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      dosha: "Vata",
      createdDate: "2024-01-18",
      status: "Active",
      duration: "7 days",
      compliance: 85
    },
    {
      id: 2,
      patientName: "Priya Verma",
      dosha: "Pitta",
      createdDate: "2024-01-16",
      status: "Completed",
      duration: "14 days",
      compliance: 92
    },
    {
      id: 3,
      patientName: "Amit Singh",
      dosha: "Kapha",
      createdDate: "2024-01-12",
      status: "In Progress",
      duration: "21 days",
      compliance: 78
    }
  ];

  const analyticsData = {
    totalPatients: 127,
    activePlans: 34,
    completedPlans: 89,
    avgCompliance: 85,
    doshaDistribution: {
      vata: 42,
      pitta: 38,
      kapha: 47
    },
    monthlyProgress: {
      newPatients: 12,
      plansCreated: 23,
      consultations: 34
    }
  };

  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report ${reportId}`);
    // In real app, this would trigger PDF download
  };

  const handleViewReport = (reportId: string) => {
    console.log(`Viewing report ${reportId}`);
    // In real app, this would open detailed view
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('reports.title')}</h1>
          <p className="text-muted-foreground">{t('reports.subtitle')}</p>
        </div>
        <Button className="bg-gradient-healing shadow-glow hover-scale">
          <FileText className="w-4 h-4 mr-2" />
          {t('reports.generateReport')}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">{t('reports.overview')}</TabsTrigger>
          <TabsTrigger value="diet-plans">{t('reports.dietPlans')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('reports.analytics')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('reports.totalPatients')}
                </CardTitle>
                <Users className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analyticsData.totalPatients}</div>
                <p className="text-xs text-success flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +12 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('reports.activePlans')}
                </CardTitle>
                <BarChart3 className="w-5 h-5 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analyticsData.activePlans}</div>
                <p className="text-xs text-success flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +8% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('reports.completedPlans')}
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analyticsData.completedPlans}</div>
                <p className="text-xs text-success flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +23% success rate
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t('reports.avgCompliance')}
                </CardTitle>
                <PieChart className="w-5 h-5 text-accent-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analyticsData.avgCompliance}%</div>
                <p className="text-xs text-success flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  +2% improvement
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dosha Distribution */}
          <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                {t('reports.doshaDistribution')}
              </CardTitle>
              <CardDescription>
                Overview of constitutional types in your practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all hover-scale">
                  <div className="text-2xl font-bold text-success mb-1">
                    {analyticsData.doshaDistribution.vata}
                  </div>
                  <p className="text-sm text-muted-foreground">Vata Patients</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all hover-scale">
                  <div className="text-2xl font-bold text-destructive mb-1">
                    {analyticsData.doshaDistribution.pitta}
                  </div>
                  <p className="text-sm text-muted-foreground">Pitta Patients</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all hover-scale">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {analyticsData.doshaDistribution.kapha}
                  </div>
                  <p className="text-sm text-muted-foreground">Kapha Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diet-plans" className="space-y-6">
          <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {t('reports.dietPlans')} Reports
              </CardTitle>
              <CardDescription>
                View and download reports for all created diet plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dietPlans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all hover-scale">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium text-sm">
                          {plan.patientName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{plan.patientName}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{plan.dosha} • {plan.duration}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {plan.createdDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={plan.status === "Active" ? "default" : 
                                plan.status === "Completed" ? "secondary" : "outline"}
                      >
                        {plan.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {plan.compliance}% {t('reports.compliance')}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(plan.id.toString())}
                          className="hover-scale"
                          title={t('reports.view')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(plan.id.toString())}
                          className="hover-scale"
                          title={t('reports.download')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Progress */}
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t('reports.monthlyProgress')}
                </CardTitle>
                <CardDescription>
                  Key metrics for the current month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">New Patients</span>
                  <Badge variant="secondary">+{analyticsData.monthlyProgress.newPatients}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Plans Created</span>
                  <Badge variant="secondary">{analyticsData.monthlyProgress.plansCreated}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Consultations</span>
                  <Badge variant="secondary">{analyticsData.monthlyProgress.consultations}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {t('reports.successMetrics')}
                </CardTitle>
                <CardDescription>
                  Patient outcomes and engagement rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('reports.planCompletion')}</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full animate-pulse" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('reports.patientSatisfaction')}</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('reports.followupAdherence')}</span>
                    <span>76%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full animate-pulse" style={{ width: '76%' }}></div>
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

export default Reports;