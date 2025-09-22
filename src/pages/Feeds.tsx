import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Settings, RefreshCw, Grid, List, Filter } from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  isRead: boolean;
  isStarred: boolean;
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "10 FREE AI Tools (No Credit Card) — 2025 (100% Legal)",
    description: "Discover amazing AI tools that require no credit card...",
    source: "Malva AI",
    publishedAt: "1d",
    imageUrl: "https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=AI+Tools",
    isRead: false,
    isStarred: false,
  },
  {
    id: "2",
    title: "How to Create Documentation that Helps Your Tech Community Grow",
    description: "Learn the best practices for creating effective documentation...",
    source: "freeCodeCamp.org News",
    publishedAt: "1d",
    imageUrl: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Documentation",
    isRead: false,
    isStarred: false,
  },
  {
    id: "3",
    title: "How to Tokenize Text in Python — Explained with Code Examples",
    description: "A comprehensive guide to text tokenization in Python...",
    source: "freeCodeCamp.org News",
    publishedAt: "2d",
    imageUrl: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Python",
    isRead: false,
    isStarred: false,
  },
  {
    id: "4",
    title: "Learn Chess and Become a Better Developer with Ihechikara Abba",
    description: "Discover how chess can improve your programming skills...",
    source: "freeCodeCamp.org News",
    publishedAt: "2d",
    imageUrl: "https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Chess",
    isRead: false,
    isStarred: false,
  },
  {
    id: "5",
    title: "A Brief Introduction to SQLite",
    description: "Everything you need to know about SQLite database...",
    source: "freeCodeCamp.org News",
    publishedAt: "2d",
    imageUrl: "https://via.placeholder.com/400x200/06B6D4/FFFFFF?text=SQLite",
    isRead: false,
    isStarred: false,
  },
  {
    id: "6",
    title: "How to Store Data Locally with Isar in Flutter",
    description: "A guide to local data storage using Isar database...",
    source: "freeCodeCamp.org News",
    publishedAt: "2d",
    imageUrl: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Flutter",
    isRead: false,
    isStarred: false,
  },
];

export default function Feeds() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "unread") return matchesSearch && !article.isRead;
    if (selectedFilter === "starred") return matchesSearch && article.isStarred;
    return matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Newsfeed</h1>
              <Badge variant="secondary">50 unread</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search in articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread (50)</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select defaultValue="newest">
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.source}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                  </div>
                  <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-xs">
                          {article.source}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                      </div>
                      <h3 className="font-medium line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}