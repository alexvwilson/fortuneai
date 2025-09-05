import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-10 bg-gray-700 rounded animate-pulse w-32" />
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-16 bg-gray-700 rounded animate-pulse" />
        </div>
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
            <div className="h-4 bg-gray-700 rounded animate-pulse w-12 mb-2" />
            <div className="h-10 bg-gray-700 rounded animate-pulse w-full" />
          </div>

          {/* Question */}
          <div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-20 mb-2" />
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-32 mb-2" />
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-4/6" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-40" />
            <div className="h-10 bg-gray-700 rounded animate-pulse w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
