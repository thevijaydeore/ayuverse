import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Globe,
  Settings,
  Calendar,
  FileText,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardHeaderProps {
  activeModule?: string;
  setActiveModule?: (module: string) => void;
}

const DashboardHeader = ({ activeModule, setActiveModule }: DashboardHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      title: "New patient registered",
      message: "Rahul Sharma has registered as a new patient",
      time: "5 mins ago",
      type: "patient",
      unread: true
    },
    {
      id: 2,
      title: "Diet plan ready for review",
      message: "Priya Verma's diet plan is ready for your review",
      time: "15 mins ago",
      type: "diet",
      unread: true
    },
    {
      id: 3,
      title: "Upcoming appointment",
      message: "Appointment with Amit Singh in 30 minutes",
      time: "25 mins ago",
      type: "appointment",
      unread: false
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    toast({
      title: "Theme Changed",
      description: `Switched to ${!isDarkMode ? "dark" : "light"} mode`,
    });
  };

  const handleLanguageChange = (newLanguage: 'English' | 'हिंदी' | 'मराठी') => {
    setLanguage(newLanguage);
    toast({
      title: "Language Changed",
      description: `Interface language changed to ${newLanguage}`,
    });
  };

  const handleProfileClick = () => {
    if (setActiveModule) {
      setActiveModule("profile");
    }
  };

  const handleSettingsClick = () => {
    if (setActiveModule) {
      setActiveModule("settings");
    }
  };

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
      {/* Left side - Sidebar trigger */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2 hover:bg-accent rounded-lg transition-colors" />
        <div className="hidden md:block">
          <h1 className="font-semibold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
      </div>

      {/* Right side - Actions and user menu */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-9 h-9 p-0"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
              🇺🇸 English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("हिंदी")}>
              🇮🇳 हिंदी
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("मराठी")}>
              🇮🇳 मराठी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-destructive-foreground">
                  {notifications.filter(n => n.unread).length}
                </span>
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t('notifications.title')}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-80">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      notification.unread ? 'bg-muted/50 border-primary/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'patient' ? 'bg-primary/10' :
                        notification.type === 'diet' ? 'bg-success/10' : 'bg-warning/10'
                      }`}>
                        {notification.type === 'patient' && <User className="w-4 h-4 text-primary" />}
                        {notification.type === 'diet' && <FileText className="w-4 h-4 text-success" />}
                        {notification.type === 'appointment' && <Calendar className="w-4 h-4 text-warning" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          {notification.unread && (
                            <Badge variant="secondary" className="text-xs px-2 py-0">New</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2 h-auto gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-healing text-primary-foreground text-sm font-medium">
                  DR
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Dr. Priya Sharma</p>
                <p className="text-xs text-muted-foreground">Ayurvedic Doctor</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="gap-2" onClick={handleProfileClick}>
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={handleSettingsClick}>
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;