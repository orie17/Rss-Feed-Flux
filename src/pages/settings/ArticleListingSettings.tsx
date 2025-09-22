import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function ArticleListingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Article Listing Settings</h2>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Warning!</strong> Changing these settings may break functionality. Use with caution.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Article listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Load read articles</Label>
              <p className="text-sm text-muted-foreground">
                Automatically load everything in <strong>Unread mode</strong> if the current section doesn't contain unread articles
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Articles font size</Label>
              <p className="text-sm text-muted-foreground">Adjusting font size also affects article titles in List view</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label className="font-medium mb-2 block">Scan tracking</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Mark items as read when you scan past them using the <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">n</kbd> and <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">p</kbd> keyboard shortcuts
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Link opening</Label>
              <p className="text-sm text-muted-foreground">Mark articles as read when opened in a browser</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Article contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Author and source</Label>
              <p className="text-sm text-muted-foreground">Display the author's name and source feed below the title</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Notes</Label>
              <p className="text-sm text-muted-foreground">Show "Create note" link</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Controls</Label>
              <p className="text-sm text-muted-foreground">Display article controls</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label htmlFor="attachments" className="font-medium">Attachments</Label>
            <Select defaultValue="images">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="images">Display as images when possible</SelectItem>
                <SelectItem value="links">Display as links</SelectItem>
                <SelectItem value="hide">Hide attachments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Keyboard shortcuts</Label>
              <p className="text-sm text-muted-foreground">Enable keyboard shortcuts</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label htmlFor="custom-css" className="font-medium">Custom CSS</Label>
            <p className="text-sm text-muted-foreground mb-2">Enter your custom CSS styles here</p>
            <textarea 
              id="custom-css"
              className="w-full h-24 p-3 text-sm border rounded-md bg-muted/50 font-mono"
              placeholder="Type your custom CSS styles here."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}