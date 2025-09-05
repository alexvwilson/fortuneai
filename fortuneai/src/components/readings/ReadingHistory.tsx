"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, Filter, Calendar, Star } from "lucide-react";
import { updateReading, deleteReading } from "@/app/actions/readings";
import { toast } from "sonner";
import type { ReadingWithType } from "@/lib/readings";

interface ReadingHistoryProps {
  readings: ReadingWithType[];
}

export function ReadingHistory({ readings }: ReadingHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFavorites, setFilterFavorites] = useState(false);

  const categories = Array.from(
    new Set(readings.map((r) => r.readingType.category))
  );

  const filteredReadings = readings.filter((reading) => {
    const matchesSearch =
      reading.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.readingType.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" ||
      reading.readingType.category === filterCategory;
    const matchesFavorites = !filterFavorites || reading.isFavorite;

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handleToggleFavorite = async (
    readingId: string,
    currentStatus: boolean
  ) => {
    try {
      const result = await updateReading(readingId, {
        isFavorite: !currentStatus,
      });
      if (result.success) {
        toast.success(
          currentStatus ? "Removed from favorites" : "Added to favorites"
        );
      } else {
        toast.error(result.error || "Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  const handleDeleteReading = async (readingId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this reading? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const result = await deleteReading(readingId);
      if (result.success) {
        toast.success("Reading deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete reading");
      }
    } catch (error) {
      console.error("Error deleting reading:", error);
      toast.error("Failed to delete reading");
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (readings.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🔮</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Readings Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start your mystical journey by getting your first fortune reading
          </p>
          <Button
            onClick={() => (window.location.href = "/new-reading/selection")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Get Your First Reading
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search readings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </option>
                ))}
              </select>

              <Button
                variant={filterFavorites ? "default" : "outline"}
                onClick={() => setFilterFavorites(!filterFavorites)}
                className={
                  filterFavorites
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500 text-purple-300 hover:bg-purple-500/10"
                }
              >
                <Star className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading List */}
      <div className="grid gap-4">
        {filteredReadings.map((reading) => (
          <Card
            key={reading.id}
            className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30 hover:border-purple-400/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{reading.readingType.icon}</span>
                  <div>
                    <CardTitle className="text-lg text-white">
                      {reading.title || `${reading.readingType.name} Reading`}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs border-purple-500/50 text-purple-300"
                      >
                        {reading.readingType.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(reading.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleToggleFavorite(reading.id, reading.isFavorite)
                    }
                    className={
                      reading.isFavorite
                        ? "text-red-400 hover:text-red-300"
                        : "text-gray-400 hover:text-red-400"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        reading.isFavorite ? "fill-current" : ""
                      }`}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      (window.location.href = `/readings/${reading.id}`)
                    }
                    className="text-purple-300 hover:text-purple-200"
                  >
                    View
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReading(reading.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Your Question:
                  </h4>
                  <p className="text-gray-200 text-sm">{reading.prompt}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Reading Preview:
                  </h4>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {reading.aiResponse.substring(0, 150)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReadings.length === 0 && readings.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
          <CardContent className="text-center py-8">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No readings match your filters
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
