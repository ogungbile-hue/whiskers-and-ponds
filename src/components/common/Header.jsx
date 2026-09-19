import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export default function Header({ isAdminView, onGoAdmin, onGoStore, onOrder, pendingCount }) {
  const handleOrder = () => {
    if (isAdminView) {
      onGoStore();
      setTimeout(() => {
        const el = document.getElementById('order-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (onOrder) {
      onOrder();
    } else {
      const el = document.getElementById('order-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-40 py-4 sm:py-5 px-4 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">

        {/* Logo — always navigates to / */}
        <button onClick={onGoStore} className="flex items-center gap-2.5 sm:gap-3 group shrink-0 text-left">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center shadow-lg shrink-0 border border-white/30">
            <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 24C12 16 26 14 36 21C39 23 42 24 43 24C42 24 39 25 36 27C26 34 12 32 7 24Z" fill="rgba(255,255,255,0.2)" stroke="white" />
              <path d="M7 24L2 18V30L7 24Z" fill="rgba(255,255,255,0.4)" stroke="white" />
              <circle cx="34" cy="22" r="1.8" fill="white" />
              <path d="M35 25C37 30 33 36 27 38" stroke="white" strokeWidth="1.8" />
              <path d="M35 22C38 18 34 13 29 11" stroke="white" strokeWidth="1.8" />
            </svg>
          </div>
          <div>
            <span className="text-white font-black text-base sm:text-lg tracking-tight leading-none block">
              Whiskers &amp; Ponds
            </span>
            <p className="text-white/60 text-[10px] sm:text-[11px] font-medium mt-0.5">Farmstead</p>
          </div>
        </button>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'Home') onGoStore();
                if (item === 'Products') {
                  const el = document.getElementById('product-selection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-white/80 hover:text-white text-sm font-semibold transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Calling Order Button */}
          {!isAdminView && (
            <button
              onClick={handleOrder}
              className="btn-calling-order py-2 px-3.5 sm:px-4 text-xs font-black flex items-center gap-1.5 shadow-lg"
              title="Jump to Order Form"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
              <span className="tracking-wide">Order</span>
            </button>
          )}

          {/* Admin / Store toggle — updates the URL */}
          <button
            onClick={isAdminView ? onGoStore : onGoAdmin}
            className="flex items-center gap-1.5 sm:gap-2 glass px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all border border-white/20"
            title={isAdminView ? 'Switch to Customer Store' : 'Open Admin Dashboard (/admindb)'}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {isAdminView ? '← Store' : 'Queue Board'}
            </span>
            {/* URL pill hint */}
            <span className="hidden md:inline text-white/50 text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded">
              {isAdminView ? '/' : '/admindb'}
            </span>
            {!isAdminView && pendingCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-teal-700 text-[9px] sm:text-[10px] font-black flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
