"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import { toggleFavoriteType } from "@/app/actions/reading-types";
import { toast } from "sonner";

interface ReadingTypeCardProps {
  readingType: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    isUserFavorite: boolean;
  };
  onFavoriteToggle?: () => void;
}

export function ReadingTypeCard({
  readingType,
  onFavoriteToggle,
}: ReadingTypeCardProps) {
  const [isFavorite, setIsFavorite] = useState(readingType.isUserFavorite);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      setIsUpdating(true);
      const result = await toggleFavoriteType(readingType.id);

      if (result.success) {
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.();
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Failed to update favorite status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500 transition-colors h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <span className="text-xl sm:text-2xl flex-shrink-0">
              {readingType.icon}
            </span>
            <CardTitle className="text-base sm:text-lg text-purple-400 truncate">
              {readingType.name}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            disabled={isUpdating}
            className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 flex-shrink-0 p-1 sm:p-2"
          >
            {isFavorite ? (
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-red-400 text-red-400" />
            ) : (
              <HeartOff className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          {readingType.category}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
          {readingType.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-xs sm:text-sm"
          >
            Start Reading
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-purple-400 text-xs sm:text-sm"
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
