import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import type { ReadingPatterns } from "@/lib/readings";

interface FavoriteTypesCardProps {
  patterns: ReadingPatterns;
}

function FavoriteTypesCard({ patterns }: FavoriteTypesCardProps) {
  const favoriteTypes = patterns.favoriteTypes;

  if (favoriteTypes.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-400 flex items-center gap-2">
            ⭐ Favorite Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-400 mb-4">No favorite types yet</p>
            <Link href="/types">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Explore Reading Types
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
        <CardTitle className="text-lg font-semibold text-purple-400 flex items-center gap-2">
          ⭐ Favorite Types
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {favoriteTypes.slice(0, 4).map((type) => (
          <div
            key={type.typeName}
            className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
          >
            <span className="text-sm font-medium text-white">
              {type.typeName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">⭐</span>
              <Link href={`/new-reading/${type.typeName.toLowerCase()}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Read
                </Button>
              </Link>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Link href="/types">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Manage Favorites
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Memoized component for better performance
export default memo(FavoriteTypesCard, (prevProps, nextProps) => {
  // Only re-render if favorite types change
  return (
    prevProps.patterns.favoriteTypes.length ===
      nextProps.patterns.favoriteTypes.length &&
    prevProps.patterns.favoriteTypes.every(
      (type, index) =>
        type.typeName === nextProps.patterns.favoriteTypes[index]?.typeName &&
        type.isFavorite === nextProps.patterns.favoriteTypes[index]?.isFavorite
    )
  );
});
