
import { Building2, BarChart3, Users, Wrench, FileText, Settings, Home, DollarSign, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
  { id: "health", label: "Health Hub", icon: Heart, path: "/health" },
  { id: "properties", label: "Properties", icon: Building2, path: "/properties" },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "finances", label: "Finances", icon: DollarSign },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function HealthSidebar() {
  const navigate = useNavigate();

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-bold">RealEstate Pro</h2>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => handleNavigation(item)}
                      isActive={window.location.pathname === item.path}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Property Manager</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
