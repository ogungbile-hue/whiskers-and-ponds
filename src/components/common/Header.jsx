import React from 'react';
import { Layers, Sparkles, Fish, ShoppingBag, Home } from 'lucide-react';

export default function Header({
  currentPath = '/',
  onGoHome,
  onGoProducts,
  onGoOrder,
  onGoAdmin,
  pendingCount = 0,
}) {
  const isAdminView = currentPath === '/admindb';
  const isHome = currentPath === '/';
  const isProducts = currentPath === '/products';
  const isOrder = currentPath === '/order';

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    if (!isHome) {
      onGoHome();
      setTimeout(() => scrollToSection('farm-story'), 150);
    } else {
      scrollToSection('farm-story');
    }
  };

  const handleContactClick = () => {
    scrollToSection('farm-footer');
  };

  return (
    <header className="relative z-40 py-4 sm:py-5 px-4 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">

        {/* Logo — always navigates to Home / */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 text-left focus:outline-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center shadow-lg shrink-0 border border-white/30 group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 48 48"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M7 24C12 16 26 14 36 21C39 23 42 24 43 24C42 24 39 25 36 27C26 34 12 32 7 24Z"
                fill="rgba(255,255,255,0.2)"
                stroke="white"
              />
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
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 glass rounded-full px-3 py-1.5 border border-white/15 shadow-md">
          <button
            onClick={onGoHome}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isHome
                ? 'bg-white text-teal-900 shadow-sm font-bold'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </button>
          <button
            onClick={onGoProducts}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isProducts
                ? 'bg-white text-teal-900 shadow-sm font-bold'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Products
          </button>
          <button
            onClick={onGoOrder}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isOrder
                ? 'bg-white text-teal-900 shadow-sm font-bold'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Order Now
          </button>
          <button
            onClick={handleAboutClick}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            About
          </button>
          <button
            onClick={handleContactClick}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            Contact
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dedicated Order CTA button in header if not already on Order page or Admin */}
          {!isAdminView && (
            <button
              onClick={onGoOrder}
              className={`btn-calling-order py-2 px-3.5 sm:px-4 text-xs font-black flex items-center gap-1.5 shadow-lg ${
                isOrder ? 'ring-2 ring-white scale-105' : ''
              }`}
              title="Open Order Portal"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
              <span className="tracking-wide">Order</span>
            </button>
          )}

          {/* Admin / Store toggle */}
          <button
            onClick={isAdminView ? onGoHome : onGoAdmin}
            className="flex items-center gap-1.5 sm:gap-2 glass px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all border border-white/20"
            title={isAdminView ? 'Switch to Customer Store' : 'Open Admin Dashboard (/admindb)'}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {isAdminView ? '← Store' : 'Queue Board'}
            </span>
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

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-center gap-1.5 mt-3 pt-2">
        <button
          onClick={onGoHome}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isHome ? 'bg-white text-teal-900 shadow-sm font-bold' : 'glass text-white/80'
          }`}
        >
          Home
        </button>
        <button
          onClick={onGoProducts}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isProducts ? 'bg-white text-teal-900 shadow-sm font-bold' : 'glass text-white/80'
          }`}
        >
          Products
        </button>
        <button
          onClick={onGoOrder}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOrder ? 'bg-white text-teal-900 shadow-sm font-bold' : 'glass text-white/80'
          }`}
        >
          Order Now
        </button>
      </div>
    </header>
  );
}
