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

export default function Settings() {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedTheme, setSelectedTheme] = useState("aqua");

  const languages = [
    { value: "english", label: "English" },
    { value: "french", label: "Français" },
    { value: "spanish", label: "Español" },
    { value: "german", label: "Deutsch" },
    { value: "italian", label: "Italiano" },
  ];

  const themes = [
    { value: "aqua", label: "Aqua", preview: "bg-gradient-to-br from-cyan-400 to-blue-500" },
    { value: "light", label: "Light", preview: "bg-gradient-to-br from-gray-100 to-white" },
    { value: "sepia", label: "Sepia", preview: "bg-gradient-to-br from-amber-100 to-orange-200" },
    { value: "dark", label: "Dark", preview: "bg-gradient-to-br from-gray-800 to-gray-900" },
  ];

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
        <div className="p-6 max-w-4xl">
          <h1 className="text-2xl font-semibold mb-6">Account</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">PROFILE</TabsTrigger>
              <TabsTrigger value="emails">EMAILS FROM INOREADER</TabsTrigger>
              <TabsTrigger value="export">EXPORT AND BACKUP</TabsTrigger>
              <TabsTrigger value="reset">RESET ACCOUNT</TabsTrigger>
              <TabsTrigger value="delete">DELETE ACCOUNT</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* Profile Picture */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="text-xl bg-primary/10">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change profile picture</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      defaultValue="4testing17" 
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      defaultValue="TESTING MAILS" 
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      defaultValue={user?.email || ""} 
                      className="max-w-md"
                      disabled
                    />
                  </div>
                  
                  <Button className="mt-4">Save changes</Button>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    ••••••••••••••••
                  </div>
                  <Button variant="outline">Change password</Button>
                </CardContent>
              </Card>

              {/* Login Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Login activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Chrome 140</div>
                        <div className="text-sm text-muted-foreground">193.74.144.72</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">05:08</div>
                      <div className="text-sm text-muted-foreground">Liège, Belgium</div>
                    </div>
                    <Button variant="link" size="sm">Sign out</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emails">
              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Configure email notifications and newsletters from CuratorRSS.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export">
              <Card>
                <CardHeader>
                  <CardTitle>Export and Backup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Export your feeds and data for backup or migration purposes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reset">
              <Card>
                <CardHeader>
                  <CardTitle>Reset Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reset your account data while keeping your profile.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delete">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Permanently delete your account and all associated data.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Settings Preview */}
          <div className="mt-12 space-y-8">
            <Separator />
            
            {/* Language Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4">Language</h3>
              <div className="grid grid-cols-3 gap-4 max-w-2xl">
                {languages.map((lang) => (
                  <div
                    key={lang.value}
                    className={`p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
                      selectedLanguage === lang.value ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedLanguage(lang.value)}
                  >
                    <div className="flex items-center gap-2">
                      {selectedLanguage === lang.value && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                      <span className="font-medium">{lang.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4">Themes</h3>
              <div className="grid grid-cols-4 gap-4 max-w-2xl">
                {themes.map((theme) => (
                  <div
                    key={theme.value}
                    className={`border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors ${
                      selectedTheme === theme.value ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedTheme(theme.value)}
                  >
                    <div className={`h-20 ${theme.preview}`}></div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {selectedTheme === theme.value && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        <span className="font-medium text-sm">{theme.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}