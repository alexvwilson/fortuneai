import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-700 rounded animate-pulse mx-auto w-80" />
        <div className="h-4 bg-gray-700 rounded animate-pulse mx-auto w-64" />
      </div>

      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="h-5 bg-gray-700 rounded animate-pulse w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-gray-700 bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-24" />
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
            <div className="h-10 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-full" />
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <div className="h-12 bg-gray-700 rounded animate-pulse w-48" />
      </div>
    </div>
  );
}
