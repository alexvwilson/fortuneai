"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share, Copy, Twitter, Facebook, Linkedin } from "lucide-react";
import { generateShareLink } from "@/app/actions/readings";
import { toast } from "sonner";
import type { Reading } from "@/drizzle/schema";

interface SharingControlsProps {
  reading: Reading;
  onClose: () => void;
}

export function SharingControls({ reading, onClose }: SharingControlsProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateShareLink = async () => {
    setIsGenerating(true);
    try {
      const result = await generateShareLink(reading.id);
      if (result.success && result.shareUrl) {
        setShareUrl(result.shareUrl);
        toast.success("Share link generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate share link");
      }
    } catch {
      toast.error("Failed to generate share link");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSocialShare = (platform: string) => {
    if (!shareUrl) return;

    const text = `Check out my fortune reading: ${
      reading.title || "Untitled Reading"
    }`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share className="w-5 h-5" />
          Share Your Reading
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!shareUrl ? (
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Generate a shareable link for this reading
            </p>
            <Button
              onClick={handleGenerateShareLink}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? "Generating..." : "Generate Share Link"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Share Link
              </label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Share on Social Media
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSocialShare("twitter")}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  onClick={() => handleSocialShare("facebook")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleSocialShare("linkedin")}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
