import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, BookOpen, User, HelpCircle } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-400">
              Welcome to FortuneAI
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your mystical journey awaits...
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Add navigation menu */}
        <nav
          id="main-navigation"
          className="mb-6 sm:mb-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="Go to dashboard"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              href="/types"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="View reading types"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Reading Types</span>
            </Link>
            <Link
              href="/new-reading/selection"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="Start a new reading"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">New Reading</span>
            </Link>
            <Link
              href="/readings"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="View your readings"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">My Readings</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="View your profile"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              aria-label="Get help and support"
            >
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Help</span>
            </Link>
          </div>
        </nav>

        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}
