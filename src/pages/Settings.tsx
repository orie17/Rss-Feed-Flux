import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  CreditCard, 
  Settings as SettingsIcon, 
  FileText, 
  Share, 
  Code, 
  Brain,
  Search,
  Palette,
  Globe,
  Monitor,
  Moon,
  Sun
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import GeneralSettings from "./settings/GeneralSettings";
import SidebarSettings from "./settings/SidebarSettings";
import ArticleListingSettings from "./settings/ArticleListingSettings";
import ArticleContentsSettings from "./settings/ArticleContentsSettings";
import DatesSettings from "./settings/DatesSettings";
import ArticleTranslationsSettings from "./settings/ArticleTranslationsSettings";
import PowerUserSettings from "./settings/PowerUserSettings";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex h-screen">
      {/* Sidebar */}
      <div className="w-72 border-r bg-muted/30 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground">
            <Search className="w-4 h-4" />
            <span>Search in settings</span>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary">
              <User className="w-4 h-4" />
              <span className="font-medium">Account</span>
              <span className="text-xs text-muted-foreground ml-auto">Personal information and password change</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span>Billing and usage</span>
              <span className="text-xs text-muted-foreground ml-auto">Payments, invoices, and feature usage</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <SettingsIcon className="w-4 h-4 text-muted-foreground" />
              <span>Settings</span>
              <span className="text-xs text-muted-foreground ml-auto">Interface, behavior, translations, etc.</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span>Content</span>
              <span className="text-xs text-muted-foreground ml-auto">Manage feeds, folders, and tags</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <Share className="w-4 h-4 text-muted-foreground" />
              <span>Share, save, login</span>
              <span className="text-xs text-muted-foreground ml-auto">Your integration services and settings</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <Code className="w-4 h-4 text-muted-foreground" />
              <span>Developer API</span>
              <span className="text-xs text-muted-foreground ml-auto">Usage statistics and API information</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
              <Brain className="w-4 h-4 text-muted-foreground" />
              <span>Intelligence</span>
              <span className="text-xs text-muted-foreground ml-auto">Generative AI prompts and preferences</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>
          
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="w-full justify-start flex-wrap h-auto p-1">
              <TabsTrigger value="general">GENERAL</TabsTrigger>
              <TabsTrigger value="sidebar">SIDEBAR</TabsTrigger>
              <TabsTrigger value="article-listing">ARTICLE LISTING</TabsTrigger>
              <TabsTrigger value="article-contents">ARTICLE CONTENTS</TabsTrigger>
              <TabsTrigger value="dates">DATES</TabsTrigger>
              <TabsTrigger value="article-translations">ARTICLE TRANSLATIONS</TabsTrigger>
              <TabsTrigger value="power-user">POWER USER SETTINGS</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="sidebar">
              <SidebarSettings />
            </TabsContent>

            <TabsContent value="article-listing">
              <ArticleListingSettings />
            </TabsContent>

            <TabsContent value="article-contents">
              <ArticleContentsSettings />
            </TabsContent>

            <TabsContent value="dates">
              <DatesSettings />
            </TabsContent>

            <TabsContent value="article-translations">
              <ArticleTranslationsSettings />
            </TabsContent>

            <TabsContent value="power-user">
              <PowerUserSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}