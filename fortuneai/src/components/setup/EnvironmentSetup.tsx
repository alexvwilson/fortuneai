import { CheckCircle, Copy, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EnvironmentSetup() {
  const exampleUrl =
    "postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleUrl);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          <CardTitle>Database Setup Required</CardTitle>
        </div>
        <CardDescription>
          Configure your Neon.tech database connection to start using the
          application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Step 1: Create Neon.tech Account</h4>
          <Button
            variant="outline"
            onClick={() => window.open("https://console.neon.tech/", "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Neon.tech Console
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Step 2: Get Your Connection String</h4>
          <p className="text-sm text-muted-foreground">
            Copy the connection string from your Neon.tech dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Step 3: Create .env.local File</h4>
          <div className="space-y-2">
            <Label htmlFor="env-content">
              Add this to your .env.local file:
            </Label>
            <div className="flex gap-2">
              <Input
                id="env-content"
                value={exampleUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Step 4: Restart Development Server</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>
              Run <code className="bg-muted px-1 rounded">npm run dev</code> to
              restart
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
