export default function DashboardLayoutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Loading Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 w-32 bg-gray-700/50 rounded-lg animate-pulse"></div>
            <div className="hidden md:flex space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-4 w-20 bg-gray-700/50 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-8 w-8 bg-gray-700/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Loading Mobile Navigation */}
      <div className="md:hidden bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="px-4 py-2 space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-700/50 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Loading Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Loading Welcome Section */}
          <div className="text-center space-y-4">
            <div className="h-16 bg-gray-700/50 rounded-lg animate-pulse mx-auto max-w-md"></div>
            <div className="h-6 bg-gray-700/50 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
          </div>

          {/* Loading Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-800/50 rounded-lg border border-gray-700 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Loading Getting Started Guide */}
          <div className="h-64 bg-gray-800/50 rounded-lg border border-gray-700 animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}
