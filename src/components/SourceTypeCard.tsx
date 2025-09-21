import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SourceType {
  name: string;
  examples: string[];
  color: 'rss' | 'youtube' | 'newsletter' | 'social';
}

interface SourceTypeCardProps {
  title: string;
  sourceTypes: SourceType[];
  className?: string;
}

export const SourceTypeCard = ({ title, sourceTypes, className }: SourceTypeCardProps) => {
  return (
    <Card className={cn("p-6 card-gradient", className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      
      <div className="space-y-4">
        {sourceTypes.map((sourceType, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={cn("source-badge", sourceType.color)}>
                {sourceType.name}
              </span>
            </div>
            
            <ul className="pl-4 space-y-1">
              {sourceType.examples.map((example, exampleIndex) => (
                <li key={exampleIndex} className="text-sm text-muted-foreground">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};