import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Rss, Globe, ExternalLink, Facebook, MessageCircle, Youtube, FileText, Import, Eye, Podcast } from "lucide-react";

const sourceTypes = [
  {
    id: "website",
    title: "Website",
    description: "Follow any website or blog",
    icon: Globe,
    color: "bg-blue-500",
  },
  {
    id: "webfeed",
    title: "Web feed",
    description: "RSS, Atom, or JSON feeds",
    icon: Rss,
    color: "bg-orange-500",
  },
  {
    id: "track",
    title: "Track changes",
    description: "Monitor page changes",
    icon: Eye,
    color: "bg-green-500",
  },
  {
    id: "google-news",
    title: "Google News",
    description: "Search Google News",
    icon: FileText,
    color: "bg-red-500",
  },
  {
    id: "bluesky",
    title: "Bluesky feed",
    description: "Follow Bluesky accounts",
    icon: MessageCircle,
    color: "bg-sky-500",
  },
  {
    id: "facebook",
    title: "Facebook page",
    description: "Follow Facebook pages",
    icon: Facebook,
    color: "bg-blue-600",
  },
  {
    id: "telegram",
    title: "Telegram channel",
    description: "Follow Telegram channels",
    icon: MessageCircle,
    color: "bg-blue-400",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Subscribe to newsletters",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    id: "import",
    title: "Import feeds",
    description: "Import OPML files",
    icon: Import,
    color: "bg-gray-500",
  },
  {
    id: "monitoring",
    title: "Monitoring feed",
    description: "Create custom monitoring",
    icon: Search,
    color: "bg-yellow-500",
  },
  {
    id: "podcast",
    title: "Podcast",
    description: "Follow podcast feeds",
    icon: Podcast,
    color: "bg-indigo-500",
  },
];

const featuredCollections = [
  {
    id: "1",
    title: "Top News",
    description: "Breaking news from major outlets",
    image: "https://via.placeholder.com/300x150/1E3A8A/FFFFFF?text=Top+News",
    gradient: "from-blue-900 to-blue-700",
  },
  {
    id: "2",
    title: "Tech News & Trends",
    description: "Latest in technology",
    image: "https://via.placeholder.com/300x150/7C3AED/FFFFFF?text=Tech+News",
    gradient: "from-purple-700 to-purple-500",
  },
  {
    id: "3",
    title: "Business & Finance",
    description: "Market updates and business news",
    image: "https://via.placeholder.com/300x150/059669/FFFFFF?text=Business",
    gradient: "from-green-700 to-green-500",
  },
  {
    id: "4",
    title: "Industry Insights",
    description: "Professional industry updates",
    image: "https://via.placeholder.com/300x150/374151/FFFFFF?text=Industry",
    gradient: "from-gray-700 to-gray-500",
  },
  {
    id: "5",
    title: "Marketing & Media",
    description: "Marketing trends and strategies",
    image: "https://via.placeholder.com/300x150/DC2626/FFFFFF?text=Marketing",
    gradient: "from-red-700 to-red-500",
  },
  {
    id: "6",
    title: "Skills & Learning",
    description: "Educational content and tutorials",
    image: "https://via.placeholder.com/300x150/EA580C/FFFFFF?text=Learning",
    gradient: "from-orange-700 to-orange-500",
  },
  {
    id: "7",
    title: "Hobby & Lifestyle",
    description: "Lifestyle and hobby content",
    image: "https://via.placeholder.com/300x150/16A34A/FFFFFF?text=Lifestyle",
    gradient: "from-green-600 to-green-400",
  },
  {
    id: "8",
    title: "Sports",
    description: "Sports news and updates",
    image: "https://via.placeholder.com/300x150/0284C7/FFFFFF?text=Sports",
    gradient: "from-blue-600 to-blue-400",
  },
];

export default function AddFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-semibold">Add new</h1>
          
          {/* Source Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {sourceTypes.map((source) => {
              const Icon = source.icon;
              return (
                <Button
                  key={source.id}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-muted/50"
                >
                  <div className={`w-8 h-8 rounded-lg ${source.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{source.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Follow Websites Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Follow websites</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for a website or paste RSS URL"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Not sure where to start? Explore our featured collections:
            </p>

            {/* Featured Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCollections.map((collection) => (
                <Card key={collection.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${collection.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <h3 className="text-white font-semibold text-lg relative z-10">{collection.title}</h3>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{collection.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}