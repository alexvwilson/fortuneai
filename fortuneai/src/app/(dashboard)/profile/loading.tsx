import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
