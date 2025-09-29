import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DoctorOverview from "@/components/DoctorOverview";
import PatientManagement from "@/components/PatientManagement";
import FoodDatabaseEnhanced from "@/components/FoodDatabaseEnhanced";
import DietGeneratorEnhanced from "@/components/DietGeneratorEnhanced";
import Reports from "@/components/Reports";
import Settings from "@/components/Settings";
import Profile from "@/components/Profile";
import { LanguageProvider } from "@/contexts/LanguageContext";

const DoctorDashboard = () => {
  const [activeModule, setActiveModule] = useState("overview");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "overview":
        return <DoctorOverview setActiveModule={setActiveModule} />;
      case "patients":
        return <PatientManagement />;
      case "food-database":
        return <FoodDatabaseEnhanced />;
      case "diet-generator":
        return <DietGeneratorEnhanced />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <DoctorOverview setActiveModule={setActiveModule} />;
    }
  };

  return (
    <LanguageProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <DoctorSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader activeModule={activeModule} setActiveModule={setActiveModule} />
            
            <main className="flex-1 p-6 overflow-auto">
              {renderActiveModule()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  );
};

export default DoctorDashboard;