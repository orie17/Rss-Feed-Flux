import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ArticleContentsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Article Contents Settings</h2>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Images</Label>
              <p className="text-sm text-muted-foreground">Load article images</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Image proxy 🔗</Label>
              <p className="text-sm text-muted-foreground">
                Securely tunnel images through CuratorRSS's proxy. <span className="text-primary">Read more</span>
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Pinterest</Label>
              <p className="text-sm text-muted-foreground">Show a Pinterest button when hovering over larger images</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Selection menu</Label>
              <p className="text-sm text-muted-foreground">Show a contextual menu on text selection</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Highlight keywords</Label>
              <p className="text-sm text-muted-foreground">Automatically highlight matched keywords in monitoring feeds</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label htmlFor="original-style" className="font-medium">Original style</Label>
            <Select defaultValue="override-colors">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="keep-styles">Keep original styles</SelectItem>
                <SelectItem value="override-colors">Override original colors</SelectItem>
                <SelectItem value="override-all">Override all original styles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}