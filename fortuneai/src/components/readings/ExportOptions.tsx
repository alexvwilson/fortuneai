"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, File, Database, Loader } from "lucide-react";
import { exportReading } from "@/app/actions/readings";
import { toast } from "sonner";
import type { Reading } from "@/drizzle/schema";

interface ExportOptionsProps {
  reading: Reading;
  onClose: () => void;
}

export function ExportOptions({ reading, onClose }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (format: "pdf" | "text" | "json") => {
    setIsExporting(format);
    try {
      const result = await exportReading(reading.id, format);
      if (result.success && result.downloadUrl) {
        // Trigger download
        window.open(result.downloadUrl, "_blank");
        toast.success(`${format.toUpperCase()} export started!`);
      } else {
        toast.error(
          result.error || `Failed to export as ${format.toUpperCase()}`
        );
      }
    } catch (error) {
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      setIsExporting(null);
    }
  };

  const exportOptions = [
    {
      format: "pdf" as const,
      label: "PDF Document",
      description: "Professional formatted document with mystical theme",
      icon: FileText,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      format: "text" as const,
      label: "Plain Text",
      description: "Simple text file for easy reading",
      icon: File,
      color: "bg-gray-500 hover:bg-gray-600",
    },
    {
      format: "json" as const,
      label: "JSON Data",
      description: "Structured data format for developers",
      icon: Database,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Reading
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">Choose a format to export your reading:</p>

        <div className="grid gap-3">
          {exportOptions.map((option) => (
            <div
              key={option.format}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-sm text-gray-400">
                    {option.description}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleExport(option.format)}
                disabled={isExporting === option.format}
                className={option.color}
              >
                {isExporting === option.format ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isExporting === option.format ? "Exporting..." : "Export"}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
