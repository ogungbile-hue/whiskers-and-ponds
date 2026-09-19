import React from 'react';
import { Check } from 'lucide-react';
import { LIVE_PREP_OPTIONS, SMOKED_PREP_OPTIONS } from '../../data/catalog';

export default function TierPrepSelector({
  selectedProduct,
  selectedTier,
  setSelectedTier,
  selectedPrep,
  setSelectedPrep,
  liveTiers,
  smokedTiers,
}) {
  const tiers = selectedProduct === 'live' ? (liveTiers || []) : (smokedTiers || []);
  const prepOptions = selectedProduct === 'live' ? LIVE_PREP_OPTIONS : SMOKED_PREP_OPTIONS;

  return (
    <section className="relative z-10 py-4 sm:py-6 px-4 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-white/20">

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-5 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-xl font-bold text-white">
                Select Quantity &amp; Preparation
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5 capitalize">
                {selectedProduct === 'live' ? 'Measured by weight' : 'Measured by fish count'}
              </p>
            </div>
          </div>

          {/* Tier tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-7">
            {tiers.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left transition-all border ${
                    isSelected
                      ? 'bg-white/25 border-white/80 shadow-lg'
                      : 'bg-white/5 border-white/15 hover:bg-white/15 hover:border-white/30'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2 right-1 sm:right-2 bg-white text-teal-700 text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
                      Best Value
                    </span>
                  )}
                  <div className="font-extrabold text-white text-xs sm:text-sm truncate">{tier.name}</div>
                  <div className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 truncate">{tier.label}</div>
                  <div className="text-white/45 text-[9px] sm:text-[10px] mt-1 line-clamp-1">
                    {tier.fishCount || tier.weightDesc}
                  </div>
                  <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-white/15 flex items-center justify-between">
                    <span className="text-white/45 text-[9px] sm:text-[10px]">Price</span>
                    <span className="text-white font-bold text-xs sm:text-sm">₦{tier.price.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prep Options */}
          <div className="border-t border-white/15 pt-5 sm:pt-6">
            <h4 className="text-xs sm:text-sm font-semibold text-white/85 mb-3">Preparation Style</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {prepOptions.map((option) => {
                const isSelected = selectedPrep === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPrep(option.id)}
                    className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white/20 border-white/60 shadow-sm'
                        : 'bg-white/5 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? 'bg-white border-white' : 'border-white/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-teal-700 stroke-[3]" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-xs sm:text-sm font-semibold truncate">{option.title}</div>
                      <div className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 leading-snug">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
