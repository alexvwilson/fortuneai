import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Loading Welcome Section */}
      <div className="text-center space-y-4">
        <div className="h-16 bg-gray-700/50 rounded-lg animate-pulse mx-auto max-w-md"></div>
        <div className="h-6 bg-gray-700/50 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
      </div>

      {/* Loading Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="h-6 bg-gray-700/50 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-gray-700/50 rounded-lg animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading Getting Started Guide */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="h-6 bg-gray-700/50 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="text-center p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="h-8 bg-gray-600/50 rounded-lg animate-pulse mx-auto mb-2"></div>
                <div className="h-4 bg-gray-600/50 rounded-lg animate-pulse mb-1"></div>
                <div className="h-3 bg-gray-600/50 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
