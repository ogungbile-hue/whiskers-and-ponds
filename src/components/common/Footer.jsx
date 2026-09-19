import React from 'react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="relative z-20 glass-dark py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-xs">
        <div className="flex items-center gap-2 text-white/80 font-semibold">
          <svg viewBox="0 0 48 48" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 24C12 16 26 14 36 21C39 23 42 24 43 24C42 24 39 25 36 27C26 34 12 32 7 24Z" fill="rgba(255,255,255,0.2)" stroke="white"/>
            <path d="M7 24L2 18V30L7 24Z" fill="rgba(255,255,255,0.4)" stroke="white"/>
          </svg>
          Whiskers &amp; Ponds Farmstead Ltd.
        </div>
        <p className="text-center">Fresh spring-fed catfish harvested daily · Hardwood kiln-smoked</p>
        <div className="flex items-center gap-3">
          <button onClick={onOpenAdmin} className="hover:text-white transition-colors underline underline-offset-2">
            Manager Portal
          </button>
          <span>·</span>
          <span>Licensed Aquaculture</span>
        </div>
      </div>
    </footer>
  );
}
