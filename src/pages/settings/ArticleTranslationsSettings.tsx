import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleTranslationsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Article Translations Settings</h2>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>This feature is only available to Pro users.</strong>
          <Button variant="outline" size="sm" className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-500">
            Upgrade now
          </Button>
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="offer-translations" className="font-medium">Offer translations</Label>
            <Select defaultValue="always">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always, except languages you read</SelectItem>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="specific">Only for specific languages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="translate-to" className="font-medium">Translate articles to</Label>
            <Select defaultValue="interface">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interface">Interface language</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="languages-read" className="font-medium">Languages you read</Label>
            <Input 
              id="languages-read"
              className="mt-2"
              placeholder="Enter languages you can read..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}