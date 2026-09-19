import React from 'react';
import { Fish, Flame, CheckCircle2, Droplets } from 'lucide-react';

export default function ProductSelector({ selectedProduct, setSelectedProduct, liveTiers, smokedTiers }) {
  const liveStart   = liveTiers?.length   ? Math.min(...liveTiers.map(t => t.price))   : 19500;
  const smokedStart = smokedTiers?.length ? Math.min(...smokedTiers.map(t => t.price)) : 14500;
  return (
    <section id="product-selection" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Choose Your Catfish
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-2">
            Two product lines. Both from the same pristine ponds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Live Catfish */}
          <button
            onClick={() => setSelectedProduct('live')}
            className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left transition-all border-2 ${
              selectedProduct === 'live'
                ? 'bg-white/20 border-white/70 shadow-2xl shadow-black/20 scale-[1.02]'
                : 'glass border-white/15 hover:bg-white/15 hover:border-white/30'
            }`}
          >
            {selectedProduct === 'live' && (
              <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-white" />
            )}

            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
              <Fish className="w-6 h-6 text-white" />
              <Droplets className="w-3 h-3 text-white/70 -ml-1 -mt-2" />
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
              Spring Pond Flushed
            </div>
            <h3 className="text-lg font-bold text-white">Fresh Live Catfish</h3>
            <p className="text-sm text-white/65 mt-2 leading-relaxed">
              Clarias gariepinus, spring-flushed 48 hrs. Zero muddy notes. Dressed or delivered live in aerated bins.
            </p>

            <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-white/50">From</span>
              <span className="font-bold text-base">₦{liveStart.toLocaleString()}</span>
            </div>
          </button>

          {/* Smoked Catfish */}
          <button
            onClick={() => setSelectedProduct('smoked')}
            className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-left transition-all border-2 ${
              selectedProduct === 'smoked'
                ? 'bg-white/20 border-white/70 shadow-2xl shadow-black/20 scale-[1.02]'
                : 'glass border-white/15 hover:bg-white/15 hover:border-white/30'
            }`}
          >
            {selectedProduct === 'smoked' && (
              <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-white" />
            )}

            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-white" />
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
              Hardwood Kiln · 18 Hours
            </div>
            <h3 className="text-lg font-bold text-white">Kiln-Smoked Catfish</h3>
            <p className="text-sm text-white/65 mt-2 leading-relaxed">
              Slow-cured over hardwood &amp; fruit sawdust. Golden glazed, intensely aromatic, up to 6-month shelf life.
            </p>

            <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-white/50">From</span>
              <span className="font-bold text-base">₦{smokedStart.toLocaleString()}</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
