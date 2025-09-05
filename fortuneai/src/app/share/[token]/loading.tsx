import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-700 rounded animate-pulse w-64 mx-auto mb-2" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-96 mx-auto" />
          </div>

          {/* Reading Content */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded animate-pulse" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 bg-gray-700 rounded animate-pulse w-24" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
                  </div>
                  <div className="h-8 bg-gray-700 rounded animate-pulse w-64" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Tags */}
              <div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-16 mb-2" />
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-700 rounded animate-pulse w-20" />
                  <div className="h-6 bg-gray-700 rounded animate-pulse w-16" />
                  <div className="h-6 bg-gray-700 rounded animate-pulse w-24" />
                </div>
              </div>

              {/* Question */}
              <div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-24 mb-2" />
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full mb-2" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                </div>
              </div>

              {/* AI Response */}
              <div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-32 mb-2" />
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-4/5" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-700">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-64 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
