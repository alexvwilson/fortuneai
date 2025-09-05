"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { exportUserData } from "@/app/actions/profile";
import { toast } from "react-hot-toast";

interface DataExportCardProps {
  userId: string;
}

export default function DataExportCard({ userId }: DataExportCardProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportUserData();
      if (result.success) {
        toast.success("Data export initiated! Check your downloads.");
        // In a real implementation, this would trigger a file download
        window.open(result.downloadUrl, "_blank");
      }
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400">
          Data Export & Management
        </CardTitle>
        <CardDescription className="text-gray-300">
          Download your data and manage your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-300">
            Export all your fortune readings, preferences, and account data in a
            downloadable format.
          </p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• All your fortune readings and responses</li>
            <li>• Your reading preferences and settings</li>
            <li>• Account information and activity history</li>
            <li>• Data will be provided in JSON format</li>
          </ul>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
        >
          {isExporting ? "Exporting..." : "📥 Export My Data"}
        </Button>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Account Management</p>
          <Button
            variant="outline"
            className="w-full border-red-600 text-red-400 hover:bg-red-900/20"
            disabled
          >
            🗑️ Delete Account (Coming Soon)
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            Account deletion will be available in a future update
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
