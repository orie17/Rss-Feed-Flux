import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  category: string;
  description: string;
  features?: string[];
  isRecommended?: boolean;
}

interface ToolCardProps {
  title: string;
  tools: Tool[];
  className?: string;
}

export const ToolCard = ({ title, tools, className }: ToolCardProps) => {
  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">{tool.name}</h4>
                {tool.isRecommended && (
                  <Badge variant="secondary" className="text-xs">Recommandé</Badge>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">{tool.category}</Badge>
            </div>
            
            {tool.features && tool.features.length > 0 && (
              <ul className="text-xs text-muted-foreground space-y-1">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};