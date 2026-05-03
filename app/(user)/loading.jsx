// app/loading.jsx  ← replaces your existing one
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">

      {/* nav skeleton */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-[rgba(201,168,76,0.1)]">
        <div className="h-5 w-24 rounded skeleton-gold" />
        <div className="hidden md:flex gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 w-12 rounded skeleton" />
          ))}
        </div>
        <div className="h-9 w-24 rounded-lg skeleton-gold" />
      </div>

      {/* hero skeleton */}
      <div className="px-8 pt-10 pb-6">
        <div className="w-full h-[420px] rounded-2xl skeleton mb-6" />
        <div className="flex gap-3">
          <div className="h-12 w-40 rounded-xl skeleton" />
          <div className="h-12 w-32 rounded-xl skeleton" />
        </div>
      </div>

      {/* filter pills */}
      <div className="px-8 pb-6 flex gap-3 flex-wrap">
        {[70, 90, 75, 85, 65, 80].map((w, i) => (
          <div key={i} className="h-8 rounded-full skeleton" style={{ width: w }} />
        ))}
      </div>

      {/* car grid */}
      <div className="px-8 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>

    </div>
  );
}

function CarCardSkeleton() {
  return (
    <div className="bg-[#111114] rounded-2xl border border-white/5 overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-1/2 rounded skeleton-gold" />
        <div className="h-5 w-4/5 rounded skeleton" />
        <div className="h-3 w-2/3 rounded skeleton" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-6 w-2/5 rounded skeleton-gold" />
          <div className="h-9 w-1/4 rounded-lg skeleton" />
        </div>
      </div>
    </div>
  );
}