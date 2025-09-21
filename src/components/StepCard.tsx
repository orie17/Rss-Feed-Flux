import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  details: string[];
  isActive?: boolean;
  isCompleted?: boolean;
  className?: string;
}

export const StepCard = ({ 
  step, 
  title, 
  description, 
  details, 
  isActive = false, 
  isCompleted = false,
  className 
}: StepCardProps) => {
  return (
    <Card className={cn(
      "p-6 transition-all duration-300 hover:shadow-lg border-2",
      isActive && "border-primary ring-4 ring-primary/20",
      isCompleted && "border-success bg-success/5",
      !isActive && !isCompleted && "border-border hover:border-primary/50",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "step-indicator",
          isActive && "active",
          isCompleted && "completed"
        )}>
          {step}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};