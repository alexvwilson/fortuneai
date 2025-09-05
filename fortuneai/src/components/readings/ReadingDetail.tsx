"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Edit,
  Save,
  X,
  Calendar,
  Tag,
  Share,
  Download,
} from "lucide-react";
import { Reading } from "@/drizzle/schema";
import { updateReading, deleteReading } from "@/app/actions/readings";
import { toast } from "sonner";
import { SharingControls } from "./SharingControls";
import { ExportOptions } from "./ExportOptions";

interface ReadingDetailProps {
  reading: Reading;
}

export function ReadingDetail({ reading }: ReadingDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(reading.title || "");
  const [editedTags, setEditedTags] = useState(reading.tags?.join(", ") || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSharing, setShowSharing] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const handleToggleFavorite = async () => {
    try {
      const result = await updateReading(reading.id, {
        isFavorite: !reading.isFavorite,
      });
      if (result.success) {
        toast.success(
          reading.isFavorite ? "Removed from favorites" : "Added to favorites"
        );
      } else {
        toast.error(result.error || "Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  const handleSaveChanges = async () => {
    setIsUpdating(true);

    try {
      const tagsArray = editedTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const result = await updateReading(reading.id, {
        title: editedTitle || undefined,
        tags: tagsArray.length > 0 ? tagsArray : undefined,
      });

      if (result.success) {
        toast.success("Reading updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.error || "Failed to update reading");
      }
    } catch (error) {
      console.error("Error updating reading:", error);
      toast.error("Failed to update reading");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(reading.title || "");
    setEditedTags(reading.tags?.join(", ") || "");
    setIsEditing(false);
  };

  const handleDeleteReading = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this reading? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const result = await deleteReading(reading.id);
      if (result.success) {
        toast.success("Reading deleted successfully");
        window.location.href = "/readings";
      } else {
        toast.error(result.error || "Failed to delete reading");
      }
    } catch (error) {
      console.error("Error deleting reading:", error);
      toast.error("Failed to delete reading");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/readings")}
          className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Readings
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleToggleFavorite}
            className={
              reading.isFavorite
                ? "text-red-400 hover:text-red-300"
                : "text-gray-400 hover:text-red-400"
            }
          >
            <Heart
              className={`w-5 h-5 ${reading.isFavorite ? "fill-current" : ""}`}
            />
          </Button>

          {/* NEW: Sharing controls */}
          <Button
            onClick={() => setShowSharing(true)}
            className="border-blue-500 text-blue-300 hover:bg-blue-500/10"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>

          {/* NEW: Export controls */}
          <Button
            onClick={() => setShowExport(true)}
            className="border-green-500 text-green-300 hover:bg-green-500/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reading Content */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔮</span>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="border-purple-500/50 text-purple-300"
                >
                  Fortune Reading
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(reading.createdAt)}
                </div>
              </div>

              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter reading title..."
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                />
              ) : (
                <CardTitle className="text-2xl text-white">
                  {reading.title || "Untitled Reading"}
                </CardTitle>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-400">Tags</h3>
            </div>

            {isEditing ? (
              <Input
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {reading.tags && reading.tags.length > 0 ? (
                  reading.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No tags</span>
                )}
              </div>
            )}
          </div>

          {/* Question */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Your Question
            </h3>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-200">{reading.prompt}</p>
            </div>
          </div>

          {/* AI Response */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Your Fortune Reading
            </h3>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {reading.aiResponse}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400">
              Last updated: {formatDate(reading.updatedAt)}
            </div>

            <Button
              variant="outline"
              onClick={handleDeleteReading}
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              Delete Reading
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Sharing modal */}
      {showSharing && (
        <SharingControls
          reading={reading}
          onClose={() => setShowSharing(false)}
        />
      )}

      {/* NEW: Export modal */}
      {showExport && (
        <ExportOptions reading={reading} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}
