"use client";

import { useReadingContext } from "@/contexts/ReadingContext";
import { ReadingTypeCard } from "./ReadingTypeCard";
import { Button } from "@/components/ui/button";

export function ReadingTypeGrid() {
  const { readingTypes, isLoading, error, refreshData } = useReadingContext();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 border-gray-800 rounded-lg p-4 sm:p-6 animate-pulse"
          >
            <div className="h-5 sm:h-6 bg-gray-700 rounded mb-3 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-red-400 mb-4 text-sm sm:text-base">
          Failed to load reading types
        </div>
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          className="sm:size-default"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (readingTypes.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-gray-400 mb-4 text-sm sm:text-base">
          No reading types available
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {readingTypes.map((readingType) => (
        <ReadingTypeCard
          key={readingType.id}
          readingType={readingType}
          onFavoriteToggle={refreshData}
        />
      ))}
    </div>
  );
}
