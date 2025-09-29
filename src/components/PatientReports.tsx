import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

const PatientReports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-healing rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Reports & Progress
        </h1>
        <p className="text-primary-foreground/80">
          Track your wellness journey and diet compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Monday</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Tuesday</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Wednesday</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>This Week Average</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">28</div>
                <div className="text-sm text-muted-foreground">Days Tracked</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-semibold">2,150</div>
                  <div className="text-xs text-muted-foreground">Avg Calories</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">87%</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientReports;