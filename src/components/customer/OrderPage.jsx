import React, { useState, useEffect } from 'react';
import {
  Fish,
  Flame,
  CheckCircle2,
  Droplets,
  Scale,
  Phone,
  MapPin,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { LIVE_PREP_OPTIONS, SMOKED_PREP_OPTIONS, DISPATCH_WINDOWS } from '../../data/catalog';

export default function OrderPage({
  selectedProduct,
  setSelectedProduct,
  selectedTier,
  setSelectedTier,
  selectedPrep,
  setSelectedPrep,
  liveTiers = [],
  smokedTiers = [],
  onOrderSubmitted,
  onGoProducts,
}) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(DISPATCH_WINDOWS[0].value);
  const [notes, setNotes] = useState('');

  const currentTiers = selectedProduct === 'live' ? liveTiers : smokedTiers;
  const currentPrepOptions = selectedProduct === 'live' ? LIVE_PREP_OPTIONS : SMOKED_PREP_OPTIONS;

  // Ensure selectedTier exists in current product line
  useEffect(() => {
    if (!selectedTier || (selectedProduct === 'live' && !liveTiers.some(t => t.id === selectedTier.id)) || (selectedProduct === 'smoked' && !smokedTiers.some(t => t.id === selectedTier.id))) {
      const defaultTier = currentTiers.find(t => t.popular) || currentTiers[0] || null;
      if (defaultTier) setSelectedTier(defaultTier);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, currentTiers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your full name, phone number, and delivery address.');
      return;
    }
    if (!selectedTier) {
      alert('Please select a basket or pack tier.');
      return;
    }

    onOrderSubmitted({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      preferredDate: deliveryDate,
      productType: selectedProduct,
      batchTier: `${selectedTier.name} (${selectedTier.label})`,
      prepOption: selectedPrep,
      estimatedPrice: selectedTier.price,
      notes: notes.trim(),
    });

    setCustomerName('');
    setPhone('');
    setAddress('');
    setNotes('');
  };

  return (
    <div className="relative z-10 py-8 sm:py-14 px-4 sm:px-8 md:px-10 max-w-5xl mx-auto pb-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 glass rounded-full px-3.5 py-1 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          Live Harvest Queue
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Place Your Harvest Order
        </h1>
        <p className="text-white/70 text-xs sm:text-base mt-2.5 leading-relaxed">
          Select your catfish line, weight tier, and custom dressing style. Average callback time is ~6 minutes.
        </p>
      </div>

      {/* Main Order Flow Container */}
      <div className="glass rounded-3xl p-5 sm:p-10 border border-white/20 shadow-2xl space-y-10">

        {/* STEP 1: Select Catfish Product Line */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-white text-teal-800 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              Select Product Type
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Live Option */}
            <button
              type="button"
              onClick={() => setSelectedProduct('live')}
              className={`rounded-2xl p-4 sm:p-5 text-left transition-all border-2 flex items-start gap-4 ${
                selectedProduct === 'live'
                  ? 'bg-white/25 border-white shadow-xl scale-[1.01]'
                  : 'bg-white/5 border-white/15 hover:bg-white/15'
              }`}
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 border border-white/20">
                <Fish className="w-6 h-6 text-cyan-200" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm sm:text-base">Fresh Live Catfish</span>
                  {selectedProduct === 'live' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-white/70 text-xs mt-1 leading-snug">
                  Pond-fresh, spring water purged. Delivered live or dressed to order.
                </p>
              </div>
            </button>

            {/* Smoked Option */}
            <button
              type="button"
              onClick={() => setSelectedProduct('smoked')}
              className={`rounded-2xl p-4 sm:p-5 text-left transition-all border-2 flex items-start gap-4 ${
                selectedProduct === 'smoked'
                  ? 'bg-white/25 border-white shadow-xl scale-[1.01]'
                  : 'bg-white/5 border-white/15 hover:bg-white/15'
              }`}
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 border border-white/20">
                <Flame className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-extrabold text-sm sm:text-base">Kiln-Smoked Catfish</span>
                  {selectedProduct === 'smoked' && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  )}
                </div>
                <p className="text-white/70 text-xs mt-1 leading-snug">
                  18-hr hardwood smoke cured. Aromatic, golden finish, 6-month shelf life.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* STEP 2: Choose Weight / Pack Tier */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white text-teal-800 text-xs font-black flex items-center justify-center">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                Choose Quantity / Tier
              </h2>
            </div>
            <button
              type="button"
              onClick={onGoProducts}
              className="text-white/70 hover:text-white text-xs underline underline-offset-2 transition-colors"
            >
              Compare all catalog specs →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentTiers.map((tier) => {
              const isSelected = selectedTier?.id === tier.id;
              return (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  className={`relative rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-left transition-all border ${
                    isSelected
                      ? 'bg-white/25 border-white shadow-lg ring-1 ring-white'
                      : 'bg-white/5 border-white/15 hover:bg-white/15 hover:border-white/30'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2 right-2 bg-white text-teal-800 text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                      Best Value
                    </span>
                  )}
                  <div className="font-extrabold text-white text-xs sm:text-sm truncate">{tier.name}</div>
                  <div className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 truncate">{tier.label}</div>
                  <div className="text-white/45 text-[9px] sm:text-[10px] mt-1 line-clamp-1">
                    {tier.fishCount || tier.weightDesc}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between">
                    <span className="text-white/50 text-[9px]">Price</span>
                    <span className="text-white font-black text-xs sm:text-sm">
                      ₦{tier.price.toLocaleString()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Choose Preparation Style */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-white text-teal-800 text-xs font-black flex items-center justify-center">
              3
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              Preparation Style
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPrepOptions.map((option) => {
              const isSelected = selectedPrep === option.id;
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setSelectedPrep(option.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white/25 border-white shadow-sm ring-1 ring-white'
                      : 'bg-white/5 border-white/15 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'bg-white border-white' : 'border-white/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-teal-800 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-xs sm:text-sm font-bold truncate">{option.title}</div>
                    <div className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 leading-snug">{option.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Customer Details & Dispatch */}
        <div className="pt-6 border-t border-white/15">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-6 rounded-full bg-white text-teal-800 text-xs font-black flex items-center justify-center">
              4
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              Contact &amp; Delivery Details
            </h2>
          </div>

          {/* Live Selection Summary Box */}
          {selectedTier && (
            <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-white/15 shrink-0">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">
                    Order Summary
                  </div>
                  <div className="text-white text-sm sm:text-base font-bold truncate">
                    {selectedTier.name} ({selectedTier.label}) · {selectedProduct === 'live' ? 'Fresh Live' : 'Kiln-Smoked'}
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 flex sm:block items-center justify-between">
                <div className="text-white/50 text-[10px] uppercase tracking-wider">Estimated Total</div>
                <div className="text-white font-black text-xl sm:text-2xl">
                  ₦{selectedTier.price?.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-xs font-bold mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeleke"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="ocean-input"
                />
              </div>

              <div>
                <label className="block text-white/80 text-xs font-bold mb-1.5 uppercase tracking-wider">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="ocean-input pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-xs font-bold mb-1.5 uppercase tracking-wider">
                Delivery Address or Pond Pickup *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-white/50" />
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, or 'Farm Pickup at Pond 4'"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="ocean-input pl-10 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-xs font-bold mb-1.5 uppercase tracking-wider">
                  Dispatch Window
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="ocean-input cursor-pointer"
                >
                  {DISPATCH_WINDOWS.map((w) => (
                    <option key={w.value} value={w.value} className="bg-teal-900 text-white">
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-xs font-bold mb-1.5 uppercase tracking-wider">
                  Special Notes / Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cut into rounds, extra ice, call before arrival..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="ocean-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-calling-order w-full py-4.5 mt-4 flex items-center justify-center gap-3 text-base sm:text-lg font-black tracking-wide group shadow-2xl"
            >
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span>SUBMIT ORDER TO QUEUE</span>
              <Send className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
