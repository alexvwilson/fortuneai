"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Reading types page error:", error);
  }, [error]);

  return (
    <div className="text-center py-12">
      <div className="text-red-400 mb-4">
        <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
        <p className="text-sm">Failed to load reading types</p>
      </div>
      <Button onClick={reset} variant="outline">
        Try Again
      </Button>
    </div>
  );
}
