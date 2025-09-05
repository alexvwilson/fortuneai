import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getReadingStats,
  getReadingPatterns,
  getRecentReadings,
} from "@/lib/readings";
import ReadingStatsCard from "@/components/dashboard/ReadingStatsCard";
import ReadingPatternsCard from "@/components/dashboard/ReadingPatternsCard";
import RecentReadingsCard from "@/components/dashboard/RecentReadingsCard";
import FavoriteTypesCard from "@/components/dashboard/FavoriteTypesCard";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null; // Layout will handle redirect
  }

  // Fetch analytics data
  const [stats, patterns, recentReadings] = await Promise.all([
    getReadingStats(user.id),
    getReadingPatterns(user.id),
    getRecentReadings(user.id, 5),
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl font-semibold text-purple-400">
            Your Fortune Journey
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm sm:text-base">
            Welcome back,{" "}
            {user.firstName || user.emailAddresses[0]?.emailAddress}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-base sm:text-lg">🔮</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white text-sm sm:text-base">
                Ready for your next reading?
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                You have {stats.totalReadings} readings in your journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/new-reading/selection">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base py-2 sm:py-3">
                🔮 Start New Reading
              </Button>
            </Link>
            <Link href="/readings">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 text-sm sm:text-base py-2 sm:py-3"
              >
                📚 Reading History
              </Button>
            </Link>
            <Link href="/types" className="sm:col-span-2 lg:col-span-1">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 text-sm sm:text-base py-2 sm:py-3"
              >
                ⚙️ Reading Types
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <ReadingStatsCard stats={stats} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <ReadingPatternsCard patterns={patterns} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <RecentReadingsCard readings={recentReadings} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <FavoriteTypesCard patterns={patterns} />
        </div>
      </div>
    </div>
  );
}
