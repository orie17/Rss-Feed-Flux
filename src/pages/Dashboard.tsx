import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Rss, Settings, Star, BookOpen, Filter, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateCollectionDialog } from '@/components/CreateCollectionDialog';
import { AddSourceDialog } from '@/components/AddSourceDialog';
import { useNavigate } from 'react-router-dom';

interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  created_at: string;
  sources_count?: number;
}

interface Source {
  id: string;
  name: string;
  url: string;
  source_type: string;
  category: string;
  is_active: boolean;
  collection_id: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showAddSource, setShowAddSource] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetchCollections();
      fetchSources();
      fetchArticleCount();
    }
  }, [user]);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('rss_collections')
        .select(`
          *,
          rss_sources(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const collectionsWithCount = data?.map(collection => ({
        ...collection,
        sources_count: collection.rss_sources?.length || 0
      })) || [];

      setCollections(collectionsWithCount);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les collections",
        variant: "destructive",
      });
    }
  };

  const fetchSources = async () => {
    try {
      const { data, error } = await supabase
        .from('rss_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSources(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les sources",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleCount = async () => {
    try {
      const { count, error } = await supabase
        .from('rss_articles')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      setArticleCount(count || 0);
    } catch (error: any) {
      console.error('Error fetching article count:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    } else {
      navigate('/');
    }
  };

  const getSourceTypeColor = (type: string) => {
    const colors = {
      rss: 'bg-orange-100 text-orange-800',
      youtube: 'bg-red-100 text-red-800',
      newsletter: 'bg-blue-100 text-blue-800',
      social: 'bg-purple-100 text-purple-800',
      blog: 'bg-green-100 text-green-800',
      news: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rss className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">CuratorRSS</h1>
                <p className="text-sm text-muted-foreground">
                  Bonjour, {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collections</p>
                  <p className="text-2xl font-bold">{collections.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sources RSS</p>
                  <p className="text-2xl font-bold">{sources.length}</p>
                </div>
                <Rss className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sources Actives</p>
                  <p className="text-2xl font-bold">{sources.filter(s => s.is_active).length}</p>
                </div>
                <Filter className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Articles</p>
                  <p className="text-2xl font-bold">{articleCount}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="collections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="sources">Sources RSS</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="collections" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Mes Collections</h2>
                <p className="text-muted-foreground">
                  Organisez vos sources RSS par thématiques
                </p>
              </div>
              <Button onClick={() => setShowCreateCollection(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Collection
              </Button>
            </div>

            {collections.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune collection</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez votre première collection pour organiser vos sources RSS
                  </p>
                  <Button onClick={() => setShowCreateCollection(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une collection
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Card key={collection.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: collection.color }}
                        />
                        <Badge variant="secondary">
                          {collection.sources_count || 0} sources
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{collection.name}</CardTitle>
                      <CardDescription>{collection.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedCollectionId(collection.id);
                            setShowAddSource(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter source
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Sources RSS</h2>
                <p className="text-muted-foreground">
                  Gérez toutes vos sources de contenu
                </p>
              </div>
              <Button 
                onClick={() => setShowAddSource(true)}
                disabled={collections.length === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une source
              </Button>
            </div>

            {collections.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Rss className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Créez d'abord une collection</h3>
                  <p className="text-muted-foreground mb-4">
                    Vous devez créer une collection avant d'ajouter des sources RSS
                  </p>
                  <Button onClick={() => setShowCreateCollection(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une collection
                  </Button>
                </CardContent>
              </Card>
            ) : sources.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Rss className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune source RSS</h3>
                  <p className="text-muted-foreground mb-4">
                    Ajoutez votre première source RSS pour commencer la curation
                  </p>
                  <Button onClick={() => setShowAddSource(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une source
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sources.map((source) => (
                  <Card key={source.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{source.name}</h3>
                            <Badge className={getSourceTypeColor(source.source_type)}>
                              {source.source_type}
                            </Badge>
                            {!source.is_active && (
                              <Badge variant="secondary">Inactif</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{source.url}</p>
                          {source.category && (
                            <p className="text-xs text-muted-foreground">
                              Catégorie: {source.category}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Articles</h2>
                <p className="text-muted-foreground">
                  Tous vos articles curatés
                </p>
              </div>
            </div>

            <Card className="text-center py-12">
              <CardContent>
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fonctionnalité en cours de développement</h3>
                <p className="text-muted-foreground">
                  La gestion des articles sera bientôt disponible
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <CreateCollectionDialog
        open={showCreateCollection}
        onOpenChange={setShowCreateCollection}
        onCollectionCreated={fetchCollections}
      />

      <AddSourceDialog
        open={showAddSource}
        onOpenChange={setShowAddSource}
        collections={collections}
        selectedCollectionId={selectedCollectionId}
        onSourceAdded={fetchSources}
      />
    </div>
  );
};

export default Dashboard;