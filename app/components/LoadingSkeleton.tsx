"use client";

/**
 * A beautiful loading skeleton for manga app
 */
export default function LoadingSkeleton() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Skeleton */}
      <div className="w-full h-[400px] md:h-[500px] bg-purple-200 rounded-3xl animate-pulse" />

      {/* Section Skeleton */}
      {[1, 2].map((section) => (
        <div key={section} className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-purple-200 rounded-lg animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="relative w-full pb-[150%] bg-purple-100 rounded-2xl" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CTA Skeleton */}
      <div className="h-48 bg-purple-200 rounded-3xl animate-pulse" />
    </div>
  );
}
