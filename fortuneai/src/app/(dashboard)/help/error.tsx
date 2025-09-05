"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HelpError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Help page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-4xl mb-4">❓</div>
          <CardTitle className="text-white">Help Unavailable</CardTitle>
          <p className="text-gray-300">
            We encountered an error while loading the help section
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-400 bg-gray-700/50 p-3 rounded-lg">
            <p className="font-semibold mb-1">Error Details:</p>
            <p className="break-all">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs">Error ID: {error.digest}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={reset}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
