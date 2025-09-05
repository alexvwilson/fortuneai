import { notFound } from "next/navigation";
import { getReadingByShareToken } from "@/lib/readings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: PageProps) {
  const { token } = await params;

  const reading = await getReadingByShareToken(token);

  if (!reading) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              🔮 Fortune Reading
            </h1>
            <p className="text-gray-400">
              A mystical reading shared from FortuneAI.com
            </p>
          </div>

          {/* Reading Content */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔮</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="border-purple-500/50 text-purple-300"
                    >
                      Shared Reading
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(reading.createdAt)}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white">
                    {reading.title || "Untitled Reading"}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Tags */}
              {reading.tags && reading.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-400">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {reading.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Question */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  The Question
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-200">{reading.prompt}</p>
                </div>
              </div>

              {/* AI Response */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  The Fortune Reading
                </h3>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {reading.aiResponse}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  This reading was shared from{" "}
                  <a
                    href="https://fortuneai.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    FortuneAI.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
