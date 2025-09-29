import { Home, Utensils, Database, TrendingUp, Sparkles, FileText, Settings, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

interface PatientSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const PatientSidebar = ({ activeModule, setActiveModule }: PatientSidebarProps) => {
  const { open } = useSidebar();
  const { t } = useLanguage();

  const menuItems = [
    {
      icon: Home,
      title: "Home",
      key: "home",
      description: "Dashboard overview"
    },
    {
      icon: Utensils,
      title: "My Diet Plan",
      key: "my-diet-plan",
      description: "View assigned diet plans"
    },
    {
      icon: Database,
      title: "Food Database",
      key: "food-database",
      description: "Search food information"
    },
    {
      icon: TrendingUp,
      title: "Nutrient Tracker",
      key: "nutrient-tracker",
      description: "Track daily nutrition"
    },
    {
      icon: Sparkles,
      title: "Diet Suggestions",
      key: "auto-diet-generator",
      description: "Get personalized suggestions"
    },
    {
      icon: FileText,
      title: "Reports",
      key: "reports",
      description: "View progress reports"
    },
    {
      icon: Settings,
      title: "Settings",
      key: "settings",
      description: "App preferences"
    },
    {
      icon: User,
      title: "Profile",
      key: "profile",
      description: "Manage your profile"
    }
  ];

  const isActive = (key: string) => activeModule === key;

  return (
    <Sidebar className={`${!open ? "w-14" : "w-64"} transition-all duration-300 animate-fade-in`}>
      <div className="p-4 border-b border-border/50">
        {open && (
          <div className="flex items-center gap-2 animate-scale-in">
            <div className="w-8 h-8 bg-gradient-healing rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">आ</span>
            </div>
            <span className="font-semibold text-foreground">आयुVerse</span>
          </div>
        )}
        {!open && (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-healing rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">आ</span>
            </div>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    className={`hover-scale transition-all duration-200 ${
                      isActive(item.key) 
                        ? "bg-primary/10 text-primary border-r-2 border-primary" 
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setActiveModule(item.key)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {open && (
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                    {!open && <span className="sr-only">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-border/50">
        <div className="text-center text-xs text-muted-foreground">
          Welcome Patient
        </div>
      </div>
    </Sidebar>
  );
};

export default PatientSidebar;