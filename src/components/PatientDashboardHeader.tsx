import { Bell, Sun, Moon, Globe, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PatientDashboardHeaderProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const PatientDashboardHeader = ({ activeModule, setActiveModule }: PatientDashboardHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const getModuleTitle = () => {
    const titles: { [key: string]: string } = {
      home: "Dashboard",
      "my-diet-plan": "My Diet Plan",
      "food-database": "Food Database",
      "nutrient-tracker": "Nutrient Tracker",
      "auto-diet-generator": "Diet Suggestions",
      reports: "Reports",
      settings: "Settings",
      profile: "Profile"
    };
    return titles[activeModule] || "Dashboard";
  };

  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{getModuleTitle()}</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Arjun
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover-scale">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New diet plan assigned</p>
                    <p className="text-xs text-muted-foreground">Dr. Priya assigned your weekly plan</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Meal reminder</p>
                    <p className="text-xs text-muted-foreground">Time for your lunch</p>
                    <p className="text-xs text-muted-foreground">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Progress update</p>
                    <p className="text-xs text-muted-foreground">Weekly compliance: 85%</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover-scale">
                <Globe className="w-4 h-4 mr-1" />
                <span className="text-xs">{language === 'English' ? 'EN' : language === 'हिंदी' ? 'हि' : 'मर'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('English')}>
                <span className={language === 'English' ? 'font-medium' : ''}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('हिंदी')}>
                <span className={language === 'हिंदी' ? 'font-medium' : ''}>हिंदी</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('मराठी')}>
                <span className={language === 'मराठी' ? 'font-medium' : ''}>मराठी</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="hover-scale">
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover-scale">
                <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    A
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2 border-b">
                <p className="font-medium">Arjun Sharma</p>
                <p className="text-sm text-muted-foreground">Patient</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveModule('profile')}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PatientDashboardHeader;