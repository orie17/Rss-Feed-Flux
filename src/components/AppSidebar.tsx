import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Rss,
  Bookmark,
  Search,
  Plus,
  Settings,
  User,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  count?: number;
}

interface CollectionItem {
  id: string;
  name: string;
  count: number;
  expanded?: boolean;
  feeds?: { id: string; name: string; count: number }[];
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home, count: 50 },
  { title: "Feeds", url: "/feeds", icon: Rss },
  { title: "Saved", url: "/saved", icon: Bookmark },
  { title: "Search", url: "/search", icon: Search },
  { title: "Add Feed", url: "/add-feed", icon: Plus },
];

// Remove hardcoded collections - users will create their own

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [expandedCollections, setExpandedCollections] = useState<string[]>(["1"]);

  const isActive = (path: string) => location.pathname === path;

  const toggleCollection = (collectionId: string) => {
    setExpandedCollections(prev =>
      prev.includes(collectionId)
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const getNavClassName = (active: boolean) =>
    `w-full justify-start gap-3 h-10 ${
      active
        ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    }`;

  return (
    <Sidebar className="border-r bg-background" collapsible="icon">
      <SidebarHeader className="p-4">
        {state !== "collapsed" && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Rss className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">CuratorRSS</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ isActive }) => getNavClassName(isActive)}>
                      <item.icon className="w-4 h-4" />
                      {state !== "collapsed" && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.count !== undefined && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                              {item.count}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
              Collections
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-4 text-center text-muted-foreground text-sm">
                <p>No collections yet.</p>
                <p className="text-xs mt-1">Create your first collection to get started.</p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2">
        {user && (
          <div className="space-y-2">
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={({ isActive }) => getNavClassName(isActive)}>
                <Settings className="w-4 h-4" />
                {state !== "collapsed" && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
            
            {state !== "collapsed" && (
              <div className="flex items-center gap-2 p-2 rounded-lg border bg-muted/50">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="h-8 w-8 p-0"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}