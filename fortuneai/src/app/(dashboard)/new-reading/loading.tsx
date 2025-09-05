import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <div className="h-8 bg-gray-700 rounded animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 min-h-[200px]">
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-4/6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
