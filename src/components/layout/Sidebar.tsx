
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Server, LineChart, Clock, PlusCircle, HelpCircle } from "lucide-react";

const AppSidebar = () => {
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      title: "Users & Access",
      path: "/users",
      icon: Users
    },
    {
      title: "Services",
      path: "/services", 
      icon: Server
    }
  ];
  
  const additionalMenuItems = [
    {
      title: "Audit Logs",
      path: "/audit-logs",
      icon: Clock,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: LineChart,
    }
  ];
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-3" size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Analytics & Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {additionalMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-3" size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="p-4 mt-auto">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <PlusCircle size={16} />
          <span>Connect Service</span>
        </Button>
        
        <Button variant="ghost" className="w-full flex items-center justify-center gap-2 mt-2">
          <HelpCircle size={16} />
          <span>Help & Support</span>
        </Button>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
