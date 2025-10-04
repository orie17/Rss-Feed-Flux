import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StepCard } from "@/components/StepCard";
import { SourceTypeCard } from "@/components/SourceTypeCard";
import { ProcessOverview } from "@/components/ProcessOverview";
import { ToolCard } from "@/components/ToolCard";
import { ArrowRight, BookOpen, Brain, Rss, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";
const Index = () => {
  const step1Details = ["Choisir un outil de MindMapping", "Définir les rubriques de votre magazine idéal", "Lister des mots clés par rubrique pour trouver les sources"];
  const step2Details = ["Créer un document pour rassembler les URL trouvées", "Classer ces URL selon le type de sources", "Identifier un maximum de types de sources différents"];
  const step3Details = ["Conversion vers flux RSS avec des agrégateurs", "Filtrer et organiser les sources en dossiers", "Trier et organiser les articles par catégories", "Intégrer des outils IA pour l'automatisation"];
  const sourceTypes = [{
    name: "Flux RSS",
    examples: ["Blogs", "Sites d'actualités", "Flux RSS natifs"],
    color: "rss" as const
  }, {
    name: "Vidéos",
    examples: ["Chaînes YouTube", "DailyMotion", "Vimeo"],
    color: "youtube" as const
  }, {
    name: "Newsletters",
    examples: ["Substack", "Newsletters d'entreprise", "Bulletins"],
    color: "newsletter" as const
  }, {
    name: "Réseaux Sociaux",
    examples: ["Facebook", "Instagram", "Pinterest", "GitHub", "X", "Behance"],
    color: "social" as const
  }];
  const additionalSources = [{
    name: "Profils Auteurs",
    examples: ["Reddit", "Medium", "Dev.to"],
    color: "social" as const
  }, {
    name: "Groupes",
    examples: ["Discord", "Facebook Groups", "Slack"],
    color: "social" as const
  }, {
    name: "Alertes",
    examples: ["Google Alerts", "Mention", "Talkwalker"],
    color: "rss" as const
  }];
  const aggregatorTools = [{
    name: "Feedly",
    category: "Agrégateur Premium",
    description: "Plateforme complète avec outils de conversion intégrés",
    features: ["Interface moderne", "Filtres avancés", "Intégrations nombreuses"],
    isRecommended: true
  }, {
    name: "Inoreader",
    category: "Agrégateur Avancé",
    description: "Outil professionnel avec fonctions de conversion",
    features: ["Conversion intégrée", "Filtres puissants", "API disponible"]
  }, {
    name: "FreshRSS",
    category: "Self-hosted",
    description: "Solution open-source auto-hébergée",
    features: ["Gratuit", "Contrôle total", "Extensible"]
  }];
  const conversionTools = [{
    name: "RSS.app",
    category: "Conversion",
    description: "Convertit n'importe quelle source en flux RSS",
    features: ["Réseaux sociaux", "Sites web", "Newsletters"]
  }, {
    name: "Kill the Newsletter",
    category: "Newsletter to RSS",
    description: "Transforme les newsletters en flux RSS",
    features: ["Simple d'usage", "Gratuit", "Fiable"]
  }, {
    name: "Zapier RSS",
    category: "Automation",
    description: "Automatise la création de flux RSS",
    features: ["Intégrations multiples", "Workflows", "Triggers"]
  }];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient">
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Créez Votre Magazine Idéal
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Plateforme complète de curation de contenu RSS pour organiser, 
                  filtrer et trier l'information selon vos objectifs.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" variant="secondary" className="group" asChild>
                    <Link to="/auth">
                      Commencer Maintenant
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 bg-red-500 hover:bg-red-400 text-slate-50">
                    <BookOpen className="mr-2 w-4 h-4" />
                    Guide Complet
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img src={heroImage} alt="RSS Aggregation Platform" className="w-full h-auto rounded-2xl shadow-2xl animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="container mx-auto px-4 py-16">
        <ProcessOverview />
      </section>

      {/* Main Steps */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Les 3 Étapes du Processus
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez cette méthodologie éprouvée pour créer votre système de curation de contenu parfait
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StepCard step={1} title="Définir Vos Objectifs" description="Établissez une base solide pour votre magazine avec des objectifs clairs et des rubriques bien définies." details={step1Details} isActive={true} />
          
          <StepCard step={2} title="Collecter Les Sources" description="Rassemblez et classifiez toutes vos sources d'information selon leur type et leur pertinence." details={step2Details} />
          
          <StepCard step={3} title="Organiser et Automatiser" description="Mettez en place un système automatisé de filtrage, tri et organisation de vos contenus." details={step3Details} />
        </div>
      </section>

      {/* Source Types */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Types de Sources Disponibles
            </h2>
            <p className="text-lg text-muted-foreground">
              Diversifiez vos sources pour une curation complète
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <SourceTypeCard title="Sources Principales" sourceTypes={sourceTypes} />
            <SourceTypeCard title="Sources Avancées" sourceTypes={additionalSources} />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Outils Recommandés
          </h2>
          <p className="text-lg text-muted-foreground">
            Les meilleurs outils pour automatiser votre workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <ToolCard title="Agrégateurs RSS" tools={aggregatorTools} />
          <ToolCard title="Outils de Conversion" tools={conversionTools} />
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <div className="text-center">
              <Brain className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Intégration IA
              </h3>
              <p className="text-muted-foreground mb-6">
                Décrochez la timbale en intégrant des outils IA pour automatiser le tri, 
                la synthèse et l'organisation de vos contenus.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Synthèses automatiques</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Classification intelligente</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Filtrage contextuel</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à Créer Votre Magazine ?
          </h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Commencez dès maintenant avec notre plateforme et transformez votre façon de consommer l'information.
          </p>
          <Button size="lg" variant="secondary" className="group" asChild>
            <Link to="/auth">
              <Rss className="mr-2 w-5 h-5" />
              Démarrer Maintenant
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Index;