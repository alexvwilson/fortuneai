"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-red-400">
            🔮 Something went wrong
          </CardTitle>
          <CardDescription className="text-gray-300">
            We couldn&apos;t load your profile. The mystical forces seem to be
            misaligned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Error: {error.message}</p>
            <Button
              onClick={reset}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
