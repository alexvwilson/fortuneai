import { AlertTriangle, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DatabaseConnectionErrorProps {
  error?: string;
}

export function DatabaseConnectionError({
  error,
}: DatabaseConnectionErrorProps) {
  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <CardTitle className="text-red-900 dark:text-red-100">
            Database Connection Error
          </CardTitle>
        </div>
        <CardDescription className="text-red-700 dark:text-red-300">
          Unable to connect to the database. Please check your configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-100 p-3 dark:bg-red-900">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium text-red-900 dark:text-red-100">
            To fix this issue:
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-red-700 dark:text-red-300">
            <li>
              Create a{" "}
              <code className="bg-red-200 px-1 rounded">.env.local</code> file
              in your project root
            </li>
            <li>Add your Neon.tech DATABASE_URL to the file</li>
            <li>Restart your development server</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://console.neon.tech/", "_blank")}
          >
            <Database className="h-4 w-4 mr-2" />
            Open Neon.tech
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/setup", "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Setup Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
