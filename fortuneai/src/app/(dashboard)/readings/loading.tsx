import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 bg-gray-700 rounded animate-pulse w-64 mb-2" />
        <div className="h-4 bg-gray-700 rounded animate-pulse w-96" />
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-700 rounded animate-pulse w-32" />
              <div className="h-10 bg-gray-700 rounded animate-pulse w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading List */}
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
                  <div>
                    <div className="h-5 bg-gray-700 rounded animate-pulse w-48 mb-2" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-16" />
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-24" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-20 mb-1" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                </div>
                <div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-24 mb-1" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
