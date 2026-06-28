export default function ChapterLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header Skeleton */}
      <div className="bg-purple-200 rounded-2xl p-6 animate-pulse">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-3">
            <div className="h-8 bg-white/50 rounded-xl w-48" />
            <div className="h-6 bg-white/50 rounded-xl w-32" />
          </div>
          <div className="h-12 bg-white/50 rounded-full w-40" />
        </div>
        <div className="mt-4 h-4 bg-white/50 rounded w-24" />
      </div>

      {/* Chapter Images Skeleton */}
      <div className="space-y-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-gray-200 animate-pulse"
            style={{ paddingTop: '150%' }}
          />
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="bg-purple-200 rounded-2xl p-8 text-center animate-pulse">
        <div className="h-8 bg-white/50 rounded-xl w-64 mx-auto mb-4" />
        <div className="h-6 bg-white/50 rounded-xl w-96 max-w-full mx-auto mb-6" />
        <div className="h-12 bg-white/50 rounded-full w-48 mx-auto" />
      </div>
    </div>
  );
}
