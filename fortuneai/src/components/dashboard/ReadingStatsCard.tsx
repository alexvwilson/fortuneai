import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";
import type { ReadingStats } from "@/lib/readings";

interface ReadingStatsCardProps {
  stats: ReadingStats;
}

function ReadingStatsCard({ stats }: ReadingStatsCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle
          className="text-lg font-semibold text-purple-400 flex items-center gap-2"
          id="reading-stats-title"
        >
          📊 Reading Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="grid grid-cols-2 gap-4"
          role="group"
          aria-labelledby="reading-stats-title"
        >
          <div
            className="text-center p-3 bg-purple-600/10 rounded-lg"
            role="img"
            aria-label={`Total readings: ${stats.totalReadings}`}
          >
            <div className="text-2xl font-bold text-purple-400">
              {stats.totalReadings}
            </div>
            <div className="text-sm text-gray-400">Total Readings</div>
          </div>
          <div
            className="text-center p-3 bg-purple-600/10 rounded-lg"
            role="img"
            aria-label={`Reading frequency: ${stats.readingFrequency.toFixed(
              1
            )} per week`}
          >
            <div className="text-2xl font-bold text-purple-400">
              {stats.readingFrequency.toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">Per Week</div>
          </div>
        </div>

        {stats.favoriteType && (
          <div
            className="text-center p-3 bg-gray-800/50 rounded-lg"
            role="img"
            aria-label={`Favorite reading type: ${stats.favoriteType}`}
          >
            <div className="text-sm text-gray-400">Favorite Type</div>
            <div className="text-lg font-semibold text-white">
              {stats.favoriteType}
            </div>
          </div>
        )}

        {stats.recentActivity && (
          <div
            className="text-center p-3 bg-gray-800/50 rounded-lg"
            role="img"
            aria-label={`Last reading: ${new Date(
              stats.recentActivity
            ).toLocaleDateString()}`}
          >
            <div className="text-sm text-gray-400">Last Reading</div>
            <time
              className="text-sm text-white"
              dateTime={stats.recentActivity.toISOString()}
            >
              {new Date(stats.recentActivity).toLocaleDateString()}
            </time>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Memoized component for better performance
export default memo(ReadingStatsCard, (prevProps, nextProps) => {
  // Only re-render if stats change
  return (
    prevProps.stats.totalReadings === nextProps.stats.totalReadings &&
    prevProps.stats.readingFrequency === nextProps.stats.readingFrequency &&
    prevProps.stats.favoriteType === nextProps.stats.favoriteType &&
    prevProps.stats.recentActivity?.getTime() ===
      nextProps.stats.recentActivity?.getTime()
  );
});
