"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updatePreferences } from "@/app/actions/profile";
import { toast } from "react-hot-toast";
import type { UserPreferences } from "@/drizzle/schema";

interface PrivacyCardProps {
  preferences: UserPreferences | null;
}

export default function PrivacyCard({ preferences }: PrivacyCardProps) {
  const [privacyLevel, setPrivacyLevel] = useState(
    preferences?.privacyLevel || "private"
  );
  const [dataSharing, setDataSharing] = useState(
    preferences?.dataSharingEnabled === "true"
  );

  const handleSave = async () => {
    try {
      await updatePreferences({
        privacyLevel: privacyLevel,
        dataSharingEnabled: dataSharing.toString(),
      });
      toast.success("Privacy settings updated successfully!");
    } catch {
      toast.error("Failed to update privacy settings");
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400">
          Privacy & Data Control
        </CardTitle>
        <CardDescription className="text-gray-300">
          Manage your privacy and data sharing preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-gray-300">Privacy Level</Label>
          <select
            value={privacyLevel}
            onChange={(e) => setPrivacyLevel(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">
            {privacyLevel === "public" &&
              "Your readings and profile are visible to everyone"}
            {privacyLevel === "private" &&
              "Your readings and profile are only visible to you"}
            {privacyLevel === "friends" &&
              "Your readings and profile are visible to friends only"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="dataSharing"
            checked={dataSharing}
            onChange={(e) => setDataSharing(e.target.checked)}
            className="rounded border-gray-600 bg-gray-800 text-purple-600"
          />
          <Label htmlFor="dataSharing" className="text-gray-300">
            Allow data sharing for research
          </Label>
        </div>
        <p className="text-xs text-gray-400">
          Help improve FortuneAI by sharing anonymous usage data
        </p>

        <Button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Save Privacy Settings
        </Button>
      </CardContent>
    </Card>
  );
}
