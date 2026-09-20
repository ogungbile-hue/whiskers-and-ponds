import React from 'react';
import { Phone, MapPin, Mail, Sparkles } from 'lucide-react';

export default function Footer({ onGoHome, onGoProducts, onGoOrder, onOpenAdmin }) {
  return (
    <footer id="farm-footer" className="relative z-20 glass-dark py-10 px-6 sm:px-10 mt-auto border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white/70 text-xs">
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <div className="w-6 h-6 rounded-full glass flex items-center justify-center border border-white/30">
              <svg viewBox="0 0 48 48" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 24C12 16 26 14 36 21C39 23 42 24 43 24C42 24 39 25 36 27C26 34 12 32 7 24Z" fill="rgba(255,255,255,0.2)" stroke="white" />
              </svg>
            </div>
            <span>Whiskers &amp; Ponds Farmstead Ltd.</span>
          </div>
          <p className="text-white/50 text-[11px] max-w-sm">
            Spring-fed aeration ponds, zero mud flavour guarantee. Harvested fresh daily for families, events, and commercial kitchens.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <button onClick={onGoHome} className="hover:text-white transition-colors">
            Home
          </button>
          <button onClick={onGoProducts} className="hover:text-white transition-colors">
            Products Catalog
          </button>
          <button onClick={onGoOrder} className="hover:text-white text-amber-300 font-bold transition-colors">
            Order Now
          </button>
          <button onClick={onOpenAdmin} className="hover:text-white transition-colors underline underline-offset-2">
            Manager / Admin
          </button>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-4 text-[11px] text-white/60">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-emerald-400" /> +234 803 000 0000
          </span>
          <span>·</span>
          <span>Licensed Aquaculture</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-white/10 text-center text-white/40 text-[10px]">
        © {new Date().getFullYear()} Whiskers &amp; Ponds Farmstead. All rights reserved.
      </div>
    </footer>
  );
}
