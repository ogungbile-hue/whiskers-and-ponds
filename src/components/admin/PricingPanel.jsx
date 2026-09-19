import React, { useState } from 'react';
import {
  Fish,
  Flame,
  RotateCcw,
  Save,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Edit3,
  AlertCircle,
} from 'lucide-react';
import { LIVE_TIERS, SMOKED_TIERS } from '../../data/catalog';

function TierRow({ tier, priceData, onSave, onToggle }) {
  const currentPrice = priceData?.price ?? tier.price;
  const isAvailable = priceData?.available ?? true;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(currentPrice));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const parsed = parseInt(draft.replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      onSave(tier.id, parsed);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setDraft(String(currentPrice)); setEditing(false); }
  };

  const priceDiff = currentPrice - tier.price;
  const pctDiff = ((priceDiff / tier.price) * 100).toFixed(1);

  return (
    <div className={`glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 border transition-all ${
      !isAvailable ? 'opacity-50 border-white/10' : 'border-white/15 hover:border-white/25'
    }`}>
      {/* Tier info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-bold text-sm">{tier.name}</span>
          <span className="text-white/50 text-xs">· {tier.label}</span>
          {tier.popular && (
            <span className="text-[9px] font-black uppercase tracking-wider bg-white text-teal-700 px-2 py-0.5 rounded-full">
              Best Value
            </span>
          )}
          {!isAvailable && (
            <span className="text-[9px] font-semibold uppercase tracking-wider bg-red-400/20 text-red-300 border border-red-400/30 px-2 py-0.5 rounded-full">
              Unavailable
            </span>
          )}
        </div>
        <div className="text-white/40 text-xs mt-1">
          {tier.fishCount || tier.weightDesc}
        </div>
        {/* Price change indicator */}
        {priceDiff !== 0 && (
          <div className={`flex items-center gap-1 text-xs mt-1.5 ${priceDiff > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
            <TrendingUp className={`w-3 h-3 ${priceDiff < 0 ? 'rotate-180' : ''}`} />
            <span>{priceDiff > 0 ? '+' : ''}{pctDiff}% from catalog default (₦{tier.price.toLocaleString()})</span>
          </div>
        )}
      </div>

      {/* Price editor */}
      <div className="flex items-center gap-2 shrink-0">
        {editing ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm font-bold">₦</span>
              <input
                type="number"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKey}
                autoFocus
                className="ocean-input pl-7 pr-3 py-2 text-sm w-36 font-bold"
                min={1}
              />
            </div>
            <button
              onClick={handleSave}
              className="p-2 rounded-xl bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-300 border border-emerald-400/30 transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setDraft(String(currentPrice)); setEditing(false); }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/50 border border-white/15 transition-colors"
              title="Cancel"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-white font-black text-lg">₦{currentPrice.toLocaleString()}</div>
              {saved && (
                <div className="text-emerald-400 text-[10px] flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-3 h-3" /> Saved
                </div>
              )}
            </div>
            <button
              onClick={() => { setDraft(String(currentPrice)); setEditing(true); }}
              className="p-2 rounded-xl glass hover:bg-white/20 text-white/60 hover:text-white border border-white/15 transition-colors"
              title="Edit price"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Availability toggle */}
        <button
          onClick={() => onToggle(tier.id)}
          className={`p-2 rounded-xl border transition-colors ${
            isAvailable
              ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/20'
              : 'bg-red-400/10 border-red-400/30 text-red-300 hover:bg-red-400/20'
          }`}
          title={isAvailable ? 'Mark as unavailable' : 'Mark as available'}
        >
          {isAvailable ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function PricingPanel({ prices, onUpdatePrice, onToggleAvailability, onResetDefaults }) {
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleReset = () => {
    if (resetConfirm) {
      onResetDefaults();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Pricing Manager</h2>
          <p className="text-white/50 text-sm mt-1">
            Edit prices and toggle availability. Changes apply instantly to the store.
          </p>
        </div>
        <button
          onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            resetConfirm
              ? 'bg-red-400/20 border-red-400/50 text-red-300 animate-pulse'
              : 'glass border-white/15 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          {resetConfirm ? 'Click again to confirm reset' : 'Reset to Defaults'}
        </button>
      </div>

      {/* Alert */}
      <div className="glass rounded-2xl p-4 flex items-start gap-3 border border-white/15">
        <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <p className="text-white/60 text-xs leading-relaxed">
          Price changes are saved instantly to this browser's storage and reflected on the storefront immediately. Toggling a tier <strong className="text-white/80">unavailable</strong> hides it from customer selection.
        </p>
      </div>

      {/* Live Catfish Pricing */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl glass">
            <Fish className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Fresh Live Catfish</h3>
            <p className="text-white/40 text-xs">Priced by gross weight</p>
          </div>
        </div>
        <div className="space-y-3">
          {LIVE_TIERS.map((tier) => (
            <TierRow
              key={tier.id}
              tier={tier}
              priceData={prices[tier.id]}
              onSave={onUpdatePrice}
              onToggle={onToggleAvailability}
            />
          ))}
        </div>
      </div>

      {/* Smoked Catfish Pricing */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl glass">
            <Flame className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Kiln-Smoked Catfish</h3>
            <p className="text-white/40 text-xs">Priced by fish count per pack</p>
          </div>
        </div>
        <div className="space-y-3">
          {SMOKED_TIERS.map((tier) => (
            <TierRow
              key={tier.id}
              tier={tier}
              priceData={prices[tier.id]}
              onSave={onUpdatePrice}
              onToggle={onToggleAvailability}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
