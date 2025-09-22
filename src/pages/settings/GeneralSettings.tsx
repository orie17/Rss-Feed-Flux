import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-6">General Settings</h2>
        <p className="text-muted-foreground mb-8">
          These are the default settings for all folders and feeds. You can customize them individually for each folder and feed or reset them globally under Account &gt; Reset account.
        </p>
      </div>

      {/* Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="card" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="list" id="list" />
              <Label htmlFor="list">List view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expanded" id="expanded" />
              <Label htmlFor="expanded">Expanded view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="column" id="column" />
              <Label htmlFor="column">Column view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Card view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="magazine" id="magazine" />
              <Label htmlFor="magazine">Magazine view</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sorting */}
      <Card>
        <CardHeader>
          <CardTitle>Sorting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="newest" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest">Newest first</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oldest" id="oldest" />
              <Label htmlFor="oldest">Oldest first</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Show in feeds */}
      <Card>
        <CardHeader>
          <CardTitle>Show in feeds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="unread" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unread" id="unread" />
              <Label htmlFor="unread">Unread articles only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All articles</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Show in tags */}
      <Card>
        <CardHeader>
          <CardTitle>Show in tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="unread-tags" className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unread-tags" id="unread-tags" />
              <Label htmlFor="unread-tags">Unread articles only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all-tags" id="all-tags" />
              <Label htmlFor="all-tags">All articles</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* More controls */}
      <Card>
        <CardHeader>
          <CardTitle>More controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Popularity indicator</h4>
            <RadioGroup defaultValue="icon" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">No indicator</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="icon" id="icon" />
                <Label htmlFor="icon">Icon only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="score" id="score" />
                <Label htmlFor="score">Icon and score</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Show feed icons</Label>
                <p className="text-sm text-muted-foreground">Display feed icons in front of feed names</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Tags button</Label>
                <p className="text-sm text-muted-foreground">Show a button that opens a menu for managing tags</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Sharing button</Label>
                <p className="text-sm text-muted-foreground">Show a sharing button in article lists</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">New tab button</Label>
                <p className="text-sm text-muted-foreground">Show a button to open articles in a new tab</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Mark as read and lists</Label>
                <p className="text-sm text-muted-foreground">Show a button that marks articles as read and removes them</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Multiple select</Label>
                <p className="text-sm text-muted-foreground">Enable selecting multiple articles to perform bulk actions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mark as read behavior */}
      <Card>
        <CardHeader>
          <CardTitle>Mark as read behavior</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Advance to next section</Label>
              <p className="text-sm text-muted-foreground">Advance to the next unread section after marking all articles as read</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Mark as read confirmation</Label>
              <p className="text-sm text-muted-foreground">Confirm when marking many items as read</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Mark all as read undo</Label>
              <p className="text-sm text-muted-foreground">Enable Undo option when marking a section as read</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Scroll tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Scroll tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Mark items as read when you scroll past them</p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label>List view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox defaultChecked />
              <Label>Expanded view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label>Column view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label>Card view</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox />
              <Label>Magazine view</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List view */}
      <Card>
        <CardHeader>
          <CardTitle>List view</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show titles only</Label>
              <p className="text-sm text-muted-foreground">Hide descriptions from the main layout</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Auto collapse</Label>
              <p className="text-sm text-muted-foreground">Automatically collapse the previous article when opening a new one</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Auto scroll</Label>
              <p className="text-sm text-muted-foreground">Automatically scroll opened articles to the top</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label className="font-medium mb-3 block">Density</Label>
            <RadioGroup defaultValue="comfort" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfort" id="comfort" />
                <Label htmlFor="comfort">Comfort</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ultra" id="ultra" />
                <Label htmlFor="ultra">Ultra</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Column view */}
      <Card>
        <CardHeader>
          <CardTitle>Column view</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Column view thumbnails</Label>
              <p className="text-sm text-muted-foreground">Show article thumbnails</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label className="font-medium mb-3 block">Density</Label>
            <RadioGroup defaultValue="comfort" className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfort" id="comfort-column" />
                <Label htmlFor="comfort-column">Comfort</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact-column" />
                <Label htmlFor="compact-column">Compact</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}