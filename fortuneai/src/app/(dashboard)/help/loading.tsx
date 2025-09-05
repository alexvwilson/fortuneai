import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HelpLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="h-10 bg-gray-700 rounded animate-pulse w-64 mx-auto mb-4" />
        <div className="h-6 bg-gray-700 rounded animate-pulse w-96 mx-auto" />
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="h-6 bg-gray-700 rounded animate-pulse w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-gray-700 rounded animate-pulse w-4/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-gray-700 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-40" />
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-full mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-3 bg-gray-700 rounded animate-pulse w-2/3"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
