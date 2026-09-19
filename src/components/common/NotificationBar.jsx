import React from 'react';

export default function NotificationBar() {
  return (
    <div className="relative z-50 glass-dark text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      <span className="flex h-1.5 w-1.5 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
      </span>
      <span className="text-white/80 font-medium">
        Live Pond Harvest · <strong className="text-white">Pond 4 &amp; 6 Spring-Flushed</strong>
      </span>
      <span className="hidden sm:inline text-white/30">|</span>
      <span className="hidden sm:inline text-white/60">Avg. callback: ~6 minutes</span>
    </div>
  );
}
