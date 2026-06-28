export default function MangaDetailLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Skeleton */}
      <div className="bg-purple-200 rounded-3xl p-8 shadow-2xl animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 h-96 bg-white/50 rounded-2xl" />
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="h-10 bg-white/50 rounded-xl w-2/3" />
              <div className="h-8 bg-white/50 rounded-full w-32" />
            </div>
            <div className="bg-white/30 rounded-2xl p-6 space-y-3">
              <div className="h-6 bg-white/50 rounded w-1/4" />
              <div className="h-4 bg-white/50 rounded w-full" />
              <div className="h-4 bg-white/50 rounded w-5/6" />
              <div className="h-4 bg-white/50 rounded w-4/6" />
            </div>
            <div className="bg-white/30 rounded-2xl p-6 space-y-3">
              <div className="h-6 bg-white/50 rounded w-1/3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 bg-white/50 rounded-full w-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List Skeleton */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 animate-pulse">
        <div className="h-8 bg-purple-200 rounded-lg w-48 mb-6" />
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
