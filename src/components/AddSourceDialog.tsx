import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
}

interface AddSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collections: Collection[];
  selectedCollectionId?: string;
  onSourceAdded: () => void;
}

const sourceTypes = [
  { value: 'rss', label: 'Flux RSS' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'social', label: 'Réseau Social' },
  { value: 'blog', label: 'Blog' },
  { value: 'news', label: 'Actualités' },
];

export const AddSourceDialog = ({ 
  open, 
  onOpenChange, 
  collections, 
  selectedCollectionId = '',
  onSourceAdded 
}: AddSourceDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    source_type: 'rss',
    category: '',
    collection_id: selectedCollectionId,
  });

  // Update collection_id when selectedCollectionId changes
  useState(() => {
    if (selectedCollectionId) {
      setFormData(prev => ({ ...prev, collection_id: selectedCollectionId }));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('rss_sources')
        .insert({
          user_id: user.id,
          collection_id: formData.collection_id,
          name: formData.name,
          url: formData.url,
          source_type: formData.source_type,
          category: formData.category || null,
        });

      if (error) throw error;

      toast({
        title: "Source ajoutée",
        description: "Votre nouvelle source RSS a été ajoutée avec succès",
      });

      // Reset form
      setFormData({
        name: '',
        url: '',
        source_type: 'rss',
        category: '',
        collection_id: selectedCollectionId,
      });

      onSourceAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la source",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle source</DialogTitle>
          <DialogDescription>
            Ajoutez une source RSS, YouTube, newsletter ou autre à votre collection
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collection">Collection</Label>
            <Select
              value={formData.collection_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, collection_id: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom de la source</Label>
            <Input
              id="name"
              placeholder="ex: TechCrunch, La Tribune..."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/feed.xml"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source_type">Type de source</Label>
            <Select
              value={formData.source_type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, source_type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie (optionnel)</Label>
            <Input
              id="category"
              placeholder="ex: Tech, Business, Lifestyle..."
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.name.trim() || !formData.url.trim() || !formData.collection_id}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ajouter la source
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};