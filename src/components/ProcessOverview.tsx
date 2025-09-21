import { Card } from "@/components/ui/card";
import { ArrowRight, Target, Database, Filter } from "lucide-react";

const processSteps = [
  {
    icon: Target,
    title: "Définir",
    description: "Objectifs et rubriques",
    color: "text-primary"
  },
  {
    icon: Database,
    title: "Collecter",
    description: "Sources et flux",
    color: "text-accent"
  },
  {
    icon: Filter,
    title: "Organiser",
    description: "Filtrer et trier",
    color: "text-info"
  }
];

export const ProcessOverview = () => {
  return (
    <Card className="p-8 card-gradient">
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
        Votre Processus de Curation
      </h2>
      
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {processSteps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-md">
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            {index < processSteps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-muted-foreground mx-6" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};