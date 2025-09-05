"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Share page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-red-400" />
              </div>
              <CardTitle className="text-2xl text-white">
                🔮 Reading Not Found
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">
                The shared reading you&apos;re looking for could not be found.
                This might be because:
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• The sharing link has expired</li>
                <li>• The reading is no longer shared</li>
                <li>• The link is invalid or corrupted</li>
              </ul>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={reset}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
