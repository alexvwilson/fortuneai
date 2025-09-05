"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReadingTypeWithUserPreference } from "@/lib/reading-types";

interface ReadingTypeFormProps {
  readingTypes: ReadingTypeWithUserPreference[];
}

export function ReadingTypeForm({ readingTypes }: ReadingTypeFormProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!selectedType || !userQuestion.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const encodedQuestion = encodeURIComponent(userQuestion.trim());
      router.push(`/new-reading/${selectedType}?question=${encodedQuestion}`);
    } catch (error) {
      console.error("Error navigating to reading session:", error);
      setIsSubmitting(false);
    }
  };

  const groupedTypes = readingTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, ReadingTypeWithUserPreference[]>);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Get Your Fortune Reading
        </h1>
        <p className="text-gray-400">
          Choose a reading type and ask your question
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300">
              Choose Your Reading Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(groupedTypes).map(([category, types]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-300 capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedType === type.id
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-700 bg-gray-800/50 hover:border-purple-400/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <h4 className="font-medium text-white">
                            {type.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300">Ask Your Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question" className="text-gray-300">
                What would you like to know?
              </Label>
              <Input
                id="question"
                type="text"
                placeholder="Ask about love, career, future, or anything on your mind..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                required
              />
            </div>
            <p className="text-sm text-gray-400">
              Be specific and open-minded. The more detailed your question, the
              more personalized your reading will be.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!selectedType || !userQuestion.trim() || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
          >
            {isSubmitting ? "Starting Reading..." : "Get My Fortune Reading"}
          </Button>
        </div>
      </form>
    </div>
  );
}
