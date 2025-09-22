import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Archive, Plus } from "lucide-react";

export default function Saved() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Read later</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive all
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search in articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute top-4 left-8 w-2 h-2 bg-orange-300 rounded-full"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-1 h-1 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-12 right-12 rotate-45">
            <div className="w-2 h-2 border-t-2 border-l-2 border-orange-400"></div>
          </div>
          <div className="absolute bottom-12 left-12 rotate-12">
            <div className="w-1.5 h-1.5 border-t border-l border-yellow-400"></div>
          </div>
          
          <div className="w-16 h-20 bg-white rounded-lg border-2 border-gray-200 shadow-sm flex flex-col">
            <div className="flex-1 p-2">
              <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
              <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
              <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
            </div>
            <div className="w-6 h-6 bg-yellow-400 rounded-full absolute bottom-2 right-2 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Your list is empty</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Articles you save to read later will appear here.
        </p>

        <div className="space-y-4 text-left">
          <h3 className="font-medium">You can save articles for later by:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
              </div>
              <span>Clicking the 'Save' icon while browsing a folder or feed.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
              </div>
              <span>Clicking the 'Save' icon in the toolbar after opening an article.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
              </div>
              <span>Using the browser or app extensions.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
              </div>
              <span>Applying rules to folders and feeds.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}