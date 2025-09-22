import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SidebarSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sidebar Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Right click</Label>
              <p className="text-sm text-muted-foreground">Open contextual menus by right-clicking in the tree</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Lock drag & drop</Label>
              <p className="text-sm text-muted-foreground">Prevent drag & drop in the sidebar</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}