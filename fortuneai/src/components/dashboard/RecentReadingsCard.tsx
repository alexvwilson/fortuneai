import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import type { ReadingWithType } from "@/lib/readings";

interface RecentReadingsCardProps {
  readings: ReadingWithType[];
}

function RecentReadingsCard({ readings }: RecentReadingsCardProps) {
  if (readings.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-400 flex items-center gap-2">
            📚 Recent Readings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🔮</div>
            <p className="text-gray-400 mb-4">No readings yet</p>
            <Link href="/new-reading/selection">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Your First Reading
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle
          className="text-lg font-semibold text-purple-400 flex items-center gap-2"
          id="recent-readings-title"
        >
          📚 Recent Readings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          role="list"
          aria-labelledby="recent-readings-title"
          aria-label="Your recent fortune readings"
        >
          {readings.slice(0, 3).map((reading) => (
            <article
              key={reading.id}
              className="p-3 bg-gray-800/50 rounded-lg"
              role="listitem"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">
                  {reading.title || "Untitled Reading"}
                </h3>
                <span
                  className="text-xs text-gray-400"
                  aria-label={`Reading type: ${reading.readingType.name}`}
                >
                  {reading.readingType.icon} {reading.readingType.name}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                {reading.prompt}
              </p>
              <div className="flex items-center justify-between">
                <time
                  className="text-xs text-gray-500"
                  dateTime={reading.createdAt.toISOString()}
                >
                  {new Date(reading.createdAt).toLocaleDateString()}
                </time>
                <Link href={`/readings/${reading.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    aria-label={`View reading: ${
                      reading.title || "Untitled Reading"
                    }`}
                  >
                    View
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/readings">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              aria-label="View all your readings"
            >
              View All Readings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Memoized component for better performance
export default memo(RecentReadingsCard, (prevProps, nextProps) => {
  // Only re-render if readings array changes
  return (
    prevProps.readings.length === nextProps.readings.length &&
    prevProps.readings.every(
      (reading, index) =>
        reading.id === nextProps.readings[index]?.id &&
        reading.updatedAt === nextProps.readings[index]?.updatedAt
    )
  );
});
