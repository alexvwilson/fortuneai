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

interface PreferencesCardProps {
  preferences: UserPreferences | null;
}

export default function PreferencesCard({ preferences }: PreferencesCardProps) {
  const [readingFrequency, setReadingFrequency] = useState(
    preferences?.readingFrequencyPreference || "weekly"
  );
  const [notifications, setNotifications] = useState(
    preferences?.notificationsEnabled === "true"
  );
  const [theme, setTheme] = useState(preferences?.theme || "dark");

  const handleSave = async () => {
    try {
      await updatePreferences({
        readingFrequencyPreference: readingFrequency,
        notificationsEnabled: notifications.toString(),
        theme: theme,
      });
      toast.success("Preferences updated successfully!");
    } catch {
      toast.error("Failed to update preferences");
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400">
          Reading Preferences
        </CardTitle>
        <CardDescription className="text-gray-300">
          Customize your reading experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-gray-300">Reading Frequency</Label>
          <select
            value={readingFrequency}
            onChange={(e) => setReadingFrequency(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div>
          <Label className="text-gray-300">Theme</Label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="rounded border-gray-600 bg-gray-800 text-purple-600"
          />
          <Label htmlFor="notifications" className="text-gray-300">
            Enable notifications
          </Label>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}
