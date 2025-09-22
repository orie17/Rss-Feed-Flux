import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DatesSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Dates Settings</h2>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Use published dates 🛈</Label>
              <p className="text-sm text-muted-foreground">Show published dates instead of received dates</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Use absolute dates 🛈</Label>
              <p className="text-sm text-muted-foreground">Show absolute dates instead of relative ones</p>
            </div>
            <Switch />
          </div>

          <div>
            <Label htmlFor="date-format" className="font-medium">Date format</Label>
            <Select defaultValue="format1">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="format1">Mon Sep 22, 2025 05:13 (D M d, Y H:i)</SelectItem>
                <SelectItem value="format2">22/09/2025 05:13</SelectItem>
                <SelectItem value="format3">Sep 22, 2025</SelectItem>
                <SelectItem value="format4">22 Sep 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timezone" className="font-medium">Time zone</Label>
            <Select defaultValue="europe-brussels">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe-brussels">Europe/Brussels - CEST (+02:00)</SelectItem>
                <SelectItem value="utc">UTC (+00:00)</SelectItem>
                <SelectItem value="america-new-york">America/New_York - EDT (-04:00)</SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokyo - JST (+09:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}