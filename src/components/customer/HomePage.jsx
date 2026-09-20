import React from 'react';
import HeroSection from './HeroSection';
import { Fish, Flame, ShieldCheck, Droplets, Clock, ArrowRight, CheckCircle2, Sparkles, MapPin, Phone } from 'lucide-react';

export default function HomePage({
  onGoOrder,
  onGoProducts,
  onSelectProductAndOrder,
  liveStartingPrice = 19500,
  smokedStartingPrice = 14500,
}) {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <HeroSection
        onOrder={onGoOrder}
        onViewProducts={onGoProducts}
      />

      {/* Product Lines Teaser Section */}
      <section className="relative z-10 py-12 sm:py-18 px-4 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Daily Harvest Lines
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Two Signature Catfish Styles
            </h2>
            <p className="text-white/70 text-xs sm:text-base mt-2.5 leading-relaxed">
              Harvested straight from our spring-fed aeration ponds. Pure, flavorful, and free of mud aftertaste.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Live Catfish Card */}
            <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-white/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/15 transition-all" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/25">
                    <Fish className="w-6 h-6 text-cyan-200" />
                  </div>
                  <span className="glass rounded-full px-3 py-1 text-[11px] font-bold text-cyan-200 border border-cyan-300/30">
                    Live Pond Harvest
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  Spring Purged · Zero Mud
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Fresh Live African Catfish</h3>
                <p className="text-white/75 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  Purged in clean spring water for 48 hours to remove all muddy flavor notes. Delivered live in oxygenated bins or custom-dressed (Point &amp; Kill).
                </p>

                <div className="mt-5 space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Point &amp; Kill, gutted, descaled or cut into steaks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Available in 5kg, 10kg, 20kg, and 50kg bulk bins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Live aeration delivery or farmgate pickup</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Starting from</div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    ₦{liveStartingPrice.toLocaleString()} <span className="text-xs font-normal text-white/60">/ 5kg basket</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={onGoProducts}
                    className="btn-outline px-4 py-2.5 text-xs font-bold hover:bg-white/10"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onSelectProductAndOrder('live')}
                    className="btn-calling-order px-5 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-lg"
                  >
                    <span>Order Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Smoked Catfish Card */}
            <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-white/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/25">
                    <Flame className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="glass rounded-full px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-300/30">
                    Traditional Hardwood Kiln
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  18-Hour Slow Smoke Cure
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Kiln-Smoked Catfish</h3>
                <p className="text-white/75 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  Slow-cured over selected hardwood and sweet sawdust for 18 continuous hours. Deep golden hue, rich aroma, and natural preservative seal without chemicals.
                </p>

                <div className="mt-5 space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Vacuum-packed or woven basket options for long shelf life</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Available in 4-pack, 10-pack, and 20-pack cartons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Ready to cook in soups, stews, or eaten direct</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold">Starting from</div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    ₦{smokedStartingPrice.toLocaleString()} <span className="text-xs font-normal text-white/60">/ 4-pack</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={onGoProducts}
                    className="btn-outline px-4 py-2.5 text-xs font-bold hover:bg-white/10"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onSelectProductAndOrder('smoked')}
                    className="btn-calling-order px-5 py-2.5 text-xs font-black flex items-center gap-1.5 shadow-lg"
                  >
                    <span>Order Smoked</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Whiskers & Ponds Quality Standard (About Section) */}
      <section id="farm-story" className="relative z-10 py-12 sm:py-18 px-4 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block glass rounded-full px-3.5 py-1 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              The Aquaculture Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Our Catfish Tastes Truly Different
            </h2>
            <p className="text-white/70 text-xs sm:text-base mt-2.5 leading-relaxed">
              We never cut corners on water purity, feed quality, or humane processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Droplets className="w-6 h-6 text-cyan-300" />,
                title: 'Spring Water Purged',
                desc: 'Continuous mountain spring water flushes out any mud notes and earthy geosmin before harvest.',
              },
              {
                icon: <Clock className="w-6 h-6 text-emerald-300" />,
                title: 'Point & Kill Freshness',
                desc: 'Never frozen or stale. Live catfish are caught directly from the pond when you submit your ticket.',
              },
              {
                icon: <Flame className="w-6 h-6 text-amber-300" />,
                title: '18-Hr Hardwood Smoking',
                desc: 'Traditional brick kilns cure our fish slowly over clean hardwood sawdust for unbeatable flavor.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-teal-200" />,
                title: 'Prompt Dispatch Guarantee',
                desc: 'Average callback time of ~6 minutes to confirm weight, dressing style, and immediate dispatch.',
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 sm:p-6 border border-white/15 shadow-xl hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4 border border-white/20">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA Strip */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-white/25 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-400/20 to-teal-600/20 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Live Queue Ready
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready For Today's Fresh Harvest?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
              Place your order now or inspect the full catalog with live weight tiers and dressing options.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={onGoOrder}
                className="btn-calling-order px-8 py-4 text-base font-black flex items-center justify-center gap-2.5 shadow-2xl w-full sm:w-auto"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoProducts}
                className="btn-outline px-7 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-white/10 w-full sm:w-auto text-center"
              >
                <span>View Full Catalog</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
