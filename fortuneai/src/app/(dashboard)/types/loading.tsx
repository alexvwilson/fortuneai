export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="h-12 bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-700 rounded w-2xl mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/50 border-gray-800 rounded-lg p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
