import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Settings, RefreshCw, Grid, List, Filter, Star, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Article {
  id: string;
  title: string;
  description: string | null;
  source_id: string;
  url: string;
  published_at: string | null;
  is_read: boolean;
  is_starred: boolean;
  ai_summary: string | null;
}

export default function Feeds() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rss_articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      return;
    }

    setArticles(data || []);
    setLoading(false);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('rss_articles')
      .update({ is_read: !currentStatus })
      .eq('id', id);

    if (!error) {
      setArticles(articles.map(a => a.id === id ? { ...a, is_read: !currentStatus } : a));
    }
  };

  const toggleStar = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('rss_articles')
      .update({ is_starred: !currentStatus })
      .eq('id', id);

    if (!error) {
      setArticles(articles.map(a => a.id === id ? { ...a, is_starred: !currentStatus } : a));
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === "unread") return matchesSearch && !article.is_read;
    if (selectedFilter === "starred") return matchesSearch && article.is_starred;
    return matchesSearch;
  });

  const unreadCount = articles.filter(a => !a.is_read).length;

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Newsfeed</h1>
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount} unread</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={fetchArticles}>
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
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
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
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {articles.length === 0 ? "No articles yet" : "No articles found"}
            </h3>
            <p className="text-muted-foreground">
              {articles.length === 0 
                ? "Add some RSS feeds to get started" 
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleStar(article.id, article.is_starred)}
                      >
                        <Star className={`h-4 w-4 ${article.is_starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleRead(article.id, article.is_read)}
                      >
                        <Mail className={`h-4 w-4 ${article.is_read ? "text-muted-foreground" : "text-primary"}`} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {article.description || article.ai_summary || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Source</span>
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium flex-1 group-hover:text-primary transition-colors">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h3>
                    <div className="flex gap-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleStar(article.id, article.is_starred)}
                      >
                        <Star className={`h-4 w-4 ${article.is_starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleRead(article.id, article.is_read)}
                      >
                        <Mail className={`h-4 w-4 ${article.is_read ? "text-muted-foreground" : "text-primary"}`} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {article.description || article.ai_summary || "No description available"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Source</span>
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}