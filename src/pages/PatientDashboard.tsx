import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import PatientDashboardHeader from "@/components/PatientDashboardHeader";
import PatientOverview from "@/components/PatientOverview";
import PatientMyDietPlan from "@/components/PatientMyDietPlan";
import PatientFoodDatabase from "@/components/PatientFoodDatabase";
import PatientNutrientTracker from "@/components/PatientNutrientTracker";
import PatientAutoDietGenerator from "@/components/PatientAutoDietGenerator";
import PatientReports from "@/components/PatientReports";
import Settings from "@/components/Settings";
import PatientProfile from "@/components/PatientProfile";
import { LanguageProvider } from "@/contexts/LanguageContext";

const PatientDashboard = () => {
  const [activeModule, setActiveModule] = useState("home");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "home":
        return <PatientOverview setActiveModule={setActiveModule} />;
      case "my-diet-plan":
        return <PatientMyDietPlan />;
      case "food-database":
        return <PatientFoodDatabase />;
      case "nutrient-tracker":
        return <PatientNutrientTracker />;
      case "auto-diet-generator":
        return <PatientAutoDietGenerator />;
      case "reports":
        return <PatientReports />;
      case "settings":
        return <Settings />;
      case "profile":
        return <PatientProfile />;
      default:
        return <PatientOverview setActiveModule={setActiveModule} />;
    }
  };

  return (
    <LanguageProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <PatientSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          
          <div className="flex-1 flex flex-col">
            <PatientDashboardHeader activeModule={activeModule} setActiveModule={setActiveModule} />
            
            <main className="flex-1 p-6 overflow-auto">
              {renderActiveModule()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  );
};

export default PatientDashboard;