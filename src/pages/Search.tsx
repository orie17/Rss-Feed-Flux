import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Filter, Clock, Info } from "lucide-react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("account");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-xl font-semibold">Search for articles</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="account">IN YOUR ACCOUNT</TabsTrigger>
              <TabsTrigger value="public">IN ALL PUBLIC FEEDS</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <Select defaultValue="newsfeed">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newsfeed">Newsfeed</SelectItem>
                <SelectItem value="all">All feeds</SelectItem>
                <SelectItem value="saved">Saved articles</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Type to begin your search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>

            <Button type="submit" size="sm">
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Search Results / Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full flex items-center justify-center mb-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-8 w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-cyan-400 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-1 h-1 bg-cyan-300 rounded-full"></div>
          <div className="absolute top-12 right-12 rotate-45">
            <div className="w-2 h-2 border-t-2 border-l-2 border-blue-400"></div>
          </div>
          <div className="absolute bottom-12 left-12 rotate-12">
            <div className="w-1.5 h-1.5 border-t border-l border-cyan-400"></div>
          </div>
          
          {/* Main search icon container */}
          <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-200 shadow-sm flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Find articles in your feeds</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Explore articles from the sources you follow. Convert your searches into monitoring feeds.
        </p>

        <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
          <Clock className="w-4 h-4" />
          <span>Your latest searches</span>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Search tips</p>
              <p>Use quotes for exact phrases, minus sign to exclude words, and asterisk as wildcard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}