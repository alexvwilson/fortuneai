import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";
import type { ReadingPatterns } from "@/lib/readings";

interface ReadingPatternsCardProps {
  patterns: ReadingPatterns;
}

function ReadingPatternsCard({ patterns }: ReadingPatternsCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400 flex items-center gap-2">
          🔮 Reading Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Type Distribution
          </h4>
          <div className="space-y-2">
            {patterns.typeDistribution.slice(0, 3).map((type) => (
              <div
                key={type.typeName}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-400">{type.typeName}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">
                    {type.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Recent Activity
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {patterns.weeklyActivity.slice(-2).map((week, index) => (
              <div
                key={index}
                className="text-center p-2 bg-gray-800/50 rounded"
              >
                <div className="text-xs text-gray-400">Week {index + 1}</div>
                <div className="text-sm font-semibold text-white">
                  {week.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Memoized component for better performance
export default memo(ReadingPatternsCard, (prevProps, nextProps) => {
  // Only re-render if patterns change
  return (
    prevProps.patterns.typeDistribution.length ===
      nextProps.patterns.typeDistribution.length &&
    prevProps.patterns.weeklyActivity.length ===
      nextProps.patterns.weeklyActivity.length &&
    prevProps.patterns.typeDistribution.every(
      (type, index) =>
        type.typeName ===
          nextProps.patterns.typeDistribution[index]?.typeName &&
        type.percentage ===
          nextProps.patterns.typeDistribution[index]?.percentage
    )
  );
});
