import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  Utensils, 
  FileText, 
  Settings,
  Leaf
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DoctorSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}


const DoctorSidebar = ({ activeModule, setActiveModule }: DoctorSidebarProps) => {
  const { t } = useLanguage();

  const menuItems = [
    { 
      id: "overview", 
      label: t('nav.overview'), 
      icon: LayoutDashboard 
    },
    { 
      id: "patients", 
      label: t('nav.patients'), 
      icon: Users 
    },
    { 
      id: "food-database", 
      label: t('nav.foodDatabase'), 
      icon: Database 
    },
    { 
      id: "diet-generator", 
      label: t('nav.dietGenerator'), 
      icon: Utensils 
    },
    { 
      id: "reports", 
      label: t('nav.reports'), 
      icon: FileText 
    },
    { 
      id: "settings", 
      label: t('nav.settings'), 
      icon: Settings 
    },
  ];
  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-healing rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">आयुVerse</h2>
            <p className="text-xs text-sidebar-foreground/70">Doctor Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveModule(item.id)}
                    isActive={activeModule === item.id}
                    className="w-full justify-start gap-3 px-3 py-2"
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DoctorSidebar;