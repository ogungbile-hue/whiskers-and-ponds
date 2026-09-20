import React, { useState } from 'react';
import { Fish, Flame, Check, Sparkles, ArrowRight, ShieldCheck, Scale, Droplets, CheckCircle2 } from 'lucide-react';
import { LIVE_PREP_OPTIONS, SMOKED_PREP_OPTIONS } from '../../data/catalog';

export default function ProductsPage({
  liveTiers = [],
  smokedTiers = [],
  onSelectTierAndOrder,
  onGoOrder,
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'live', 'smoked'

  return (
    <div className="relative z-10 py-8 sm:py-14 px-4 sm:px-8 md:px-10 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          Pond Catalog &amp; Live Rates
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Catfish Harvest Catalog
        </h1>
        <p className="text-white/70 text-xs sm:text-base mt-3 leading-relaxed">
          Spring-flushed Clarias gariepinus and artisanal hardwood kiln-smoked catfish. All prices are updated live from our farm manager queue.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'live', label: 'Fresh Live Catfish' },
            { id: 'smoked', label: 'Kiln-Smoked Catfish' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === tab.id
                  ? 'bg-white text-teal-900 shadow-lg scale-105'
                  : 'glass text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fresh Live Catfish Section */}
      {(filter === 'all' || filter === 'live') && (
        <div className="mb-14 sm:mb-18">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-3 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/20">
                <Fish className="w-5 h-5 text-cyan-200" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Fresh Live African Catfish</h2>
                <p className="text-white/60 text-xs mt-0.5">Spring-purged 48 hours · Measured strictly by weight</p>
              </div>
            </div>
            <span className="glass rounded-full px-3 py-1 text-xs text-emerald-300 font-bold border border-emerald-400/30">
              ● Active Spring Harvest
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {liveTiers.map((tier) => (
              <div
                key={tier.id}
                className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-xl flex flex-col justify-between relative hover:border-white/40 transition-all group"
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-4 bg-white text-teal-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-200 mb-1">
                    {tier.label}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">{tier.name}</h3>
                  <div className="text-white/60 text-xs mt-1.5 font-medium">{tier.weightDesc}</div>
                  <div className="text-white/45 text-[11px] mt-0.5">{tier.fishCount}</div>

                  <div className="mt-4 pt-3 border-t border-white/15 space-y-1.5 text-[11px] text-white/70">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Zero mud flavor guaranteed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Point &amp; kill or live delivery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-white/50 text-[11px]">Price</span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      ₦{tier.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectTierAndOrder(tier, 'live')}
                    className="btn-calling-order w-full py-2.5 text-xs font-black flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Order This Size</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kiln-Smoked Catfish Section */}
      {(filter === 'all' || filter === 'smoked') && (
        <div className="mb-14 sm:mb-18">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-3 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/20">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Kiln-Smoked African Catfish</h2>
                <p className="text-white/60 text-xs mt-0.5">18-hour hardwood slow smoke · Measured by fish count</p>
              </div>
            </div>
            <span className="glass rounded-full px-3 py-1 text-xs text-amber-300 font-bold border border-amber-400/30">
              ● Fresh Cured Daily
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {smokedTiers.map((tier) => (
              <div
                key={tier.id}
                className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-xl flex flex-col justify-between relative hover:border-white/40 transition-all group"
              >
                {tier.popular && (
                  <span className="absolute -top-3 right-4 bg-white text-teal-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                    Chef's Pick
                  </span>
                )}

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    {tier.label}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">{tier.name}</h3>
                  <div className="text-white/60 text-xs mt-1.5 font-medium">{tier.fishCount}</div>
                  <div className="text-white/45 text-[11px] mt-0.5">{tier.weightDesc}</div>

                  <div className="mt-4 pt-3 border-t border-white/15 space-y-1.5 text-[11px] text-white/70">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Natural spice and wood smoke cured</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Moisture sealed · 6-month shelf life</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-white/50 text-[11px]">Price</span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      ₦{tier.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectTierAndOrder(tier, 'smoked')}
                    className="btn-calling-order w-full py-2.5 text-xs font-black flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Order This Pack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preparation Styles Guide */}
      <div className="glass rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-cyan-200 text-xs font-bold uppercase tracking-wider">Kitchen &amp; Storage Prep</span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Available Preparation Styles</h3>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Choose how you'd like your fish prepared when placing your order at no extra charge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Point & Kill (Dressed)',
              desc: 'Dispatched fresh, fully gutted, bile-free, and washed in spring water ready for seasoning.',
            },
            {
              title: 'Cut into Steaks',
              desc: 'Thick succulent rounds and steaks tailored for pepper soup, point-and-kill barbecue, or frying.',
            },
            {
              title: 'Whole Live Aerated',
              desc: 'Delivered swimming in oxygenated containment bins for aquariums, holding tanks, or live display.',
            },
            {
              title: 'Vacuum Sealed Smoked',
              desc: 'Airtight packaging for prolonged pantry storage, traveling, gift baskets, or overseas transit.',
            },
          ].map((style, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-xs font-bold text-white mb-3">
                0{i + 1}
              </div>
              <h4 className="text-white text-sm font-bold mb-1">{style.title}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{style.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="text-center py-6">
        <button
          onClick={onGoOrder}
          className="btn-calling-order px-10 py-4 text-base font-black inline-flex items-center gap-3 shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>PROCEED TO ORDER NOW</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
