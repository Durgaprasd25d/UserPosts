'use client';

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0">
          <div className="w-full h-full rounded-full border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/50 animate-spin"></div>
        </div>
        <div className="absolute inset-0 rotate-45">
          <div className="w-full h-full rounded-full border-4 border-t-primary/50 border-r-primary/20 border-b-primary/40 border-l-primary/10 animate-spin animation-delay-200"></div>
        </div>
        <div className="absolute inset-2">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse"></div>
        </div>
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}