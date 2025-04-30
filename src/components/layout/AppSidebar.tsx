
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Settings,
  List,
  FileText,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-brand-blue">LeadHunter</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <Home className="h-5 w-5" />
                    <span>仪表盘</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/search"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <Search className="h-5 w-5" />
                    <span>搜索抓取</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/import"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <FileText className="h-5 w-5" />
                    <span>数据导入</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/results"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <List className="h-5 w-5" />
                    <span>抓取结果</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <Settings className="h-5 w-5" />
                    <span>设置</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>抓取方法</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/methods/api"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <span className="text-xs font-semibold rounded-full bg-blue-100 text-blue-600 px-2 py-1">API</span>
                    <span>API抓取</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/methods/ai"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <span className="text-xs font-semibold rounded-full bg-green-100 text-green-600 px-2 py-1">AI</span>
                    <span>AI模型工具</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/methods/mcp"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )
                    }
                  >
                    <span className="text-xs font-semibold rounded-full bg-purple-100 text-purple-600 px-2 py-1">MCP</span>
                    <span>MCP服务</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
