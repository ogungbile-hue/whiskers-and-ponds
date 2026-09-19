import React, { useState } from 'react';
import { Phone, MapPin, Send, Scale } from 'lucide-react';
import { DISPATCH_WINDOWS } from '../../data/catalog';

export default function OrderForm({ selectedProduct, selectedTier, selectedPrep, onOrderSubmitted }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(DISPATCH_WINDOWS[0].value);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
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
    setCustomerName(''); setPhone(''); setAddress(''); setNotes('');
  };

  return (
    <section id="order-form" className="relative z-10 py-6 sm:py-8 px-4 sm:px-8 md:px-10 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/20">

          {/* Step label */}
          <div className="text-center mb-6">
            <span className="inline-block glass rounded-full px-3.5 py-1 text-white/80 text-xs font-semibold uppercase tracking-widest mb-2.5">
              Final Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Place Your Order</h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1">We'll call you back within 6 minutes to confirm dispatch.</p>
          </div>

          {/* Order summary pill */}
          <div className="mb-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">Your selection</div>
                <div className="text-white text-xs sm:text-sm font-semibold truncate">
                  {selectedTier.name} ({selectedTier.label}) · {selectedProduct === 'live' ? 'Fresh Live' : 'Kiln-Smoked'}
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 flex sm:block items-center justify-between">
              <div className="text-white/50 text-[10px]">Est. price</div>
              <div className="text-white font-black text-base sm:text-xl">₦{selectedTier.price?.toLocaleString()}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kelechi Nwosu"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="ocean-input"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  WhatsApp / Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
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
              <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Delivery Address or Pond Pickup *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
                <textarea
                  rows={2}
                  required
                  placeholder="Street address, estate, or 'Farm Pickup'"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="ocean-input pl-10 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Dispatch Window
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="ocean-input cursor-pointer"
                >
                  {DISPATCH_WINDOWS.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                  Special Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cut into rounds..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="ocean-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-calling-order w-full py-4 mt-3 flex items-center justify-center gap-3 text-base sm:text-lg font-black tracking-wide group shadow-2xl"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              <span>SUBMIT ORDER TO QUEUE</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
