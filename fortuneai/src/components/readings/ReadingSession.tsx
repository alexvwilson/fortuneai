"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed server action import - using API route instead
import { toast } from "sonner";

interface ReadingSessionProps {
  readingType: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  userQuestion: string;
}

export function ReadingSession({
  readingType,
  userQuestion,
}: ReadingSessionProps) {
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);
  // Prevent duplicate fortune generation due to React Strict Mode or component re-mounting
  const hasGenerated = useRef(false);

  const saveReading = useCallback(
    async (response: string): Promise<void> => {
      try {
        const response_data = await fetch("/api/readings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            readingTypeId: readingType.id,
            prompt: userQuestion,
            aiResponse: response,
            title: `${readingType.name} Reading`,
          }),
        });

        const result = await response_data.json();

        if (result.success) {
          toast.success("Reading saved to your history!");
        } else {
          toast.error(result.error || "Failed to save reading");
        }
      } catch (error) {
        console.error("Error saving reading:", error);
        toast.error("Failed to save reading");
      }
    },
    [readingType.id, readingType.name, userQuestion]
  );

  const generateFortune = useCallback(async (): Promise<void> => {
    if (hasGenerated.current) return;

    hasGenerated.current = true;
    setIsGenerating(true);
    setAiResponse("");

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readingType: readingType.name,
          userQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate fortune");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response stream available");
      }

      const decoder = new TextDecoder();
      let fullResponse = "";

      const pump = async (): Promise<void> => {
        const { done, value } = await reader.read();
        if (done) {
          setIsGenerating(false);
          setIsComplete(true);
          await saveReading(fullResponse);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        setAiResponse(fullResponse);

        // Auto-scroll to bottom
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }

        return pump();
      };

      await pump();
    } catch (error) {
      console.error("Error generating fortune:", error);
      toast.error("Failed to generate fortune reading");
      setIsGenerating(false);
    }
  }, [readingType.name, userQuestion, saveReading]);

  useEffect(() => {
    generateFortune();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <span className="text-2xl">{readingType.icon}</span>
            {readingType.name} Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Your Question:
            </h3>
            <p className="text-gray-200">{userQuestion}</p>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 min-h-[200px]">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Your Fortune:
            </h3>
            <div
              ref={responseRef}
              className="text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto"
            >
              {aiResponse}
              {isGenerating && (
                <span className="inline-block w-2 h-5 bg-purple-400 animate-pulse ml-1" />
              )}
            </div>
          </div>

          {isComplete && (
            <div className="flex gap-3">
              <Button
                onClick={() => (window.location.href = "/new-reading")}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
              >
                New Reading
              </Button>
              <Button
                onClick={() => (window.location.href = "/readings")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                View All Readings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
