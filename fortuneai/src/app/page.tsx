import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold spooky-glow">
            FortuneAI
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto px-4">
            Discover your future with AI-powered fortune telling
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto px-4">
            Experience mystical insights and predictions powered by cutting-edge
            artificial intelligence
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link href="/sign-up" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
            >
              Get Your Fortune
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-purple-500 text-purple-300 hover:bg-purple-500/10 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4">
          <div className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🔮</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              AI-Powered Insights
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Advanced machine learning algorithms provide personalized fortune
              readings
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">✨</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Mystical Experience
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Immerse yourself in a world of enchantment and spiritual discovery
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🌟</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Personal Growth
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Gain insights that help you navigate life&rsquo;s journey with
              confidence
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <Link
              href="/sign-in"
              className="hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/sign-up"
              className="hover:text-white transition-colors"
            >
              Sign Up
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/forgot-password"
              className="hover:text-white transition-colors"
            >
              Forgot Password
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
