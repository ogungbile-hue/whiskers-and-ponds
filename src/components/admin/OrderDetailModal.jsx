import React, { useState } from 'react';
import {
  X, Fish, Flame, MapPin, Calendar, Phone, Clock,
  MessageSquare, Save, CheckCircle2
} from 'lucide-react';
import { getFarmerReplyWhatsAppUrl } from '../../utils/whatsapp';

const STATUS_OPTIONS = ['Pending Reply', 'Contacted', 'Confirmed', 'Dispatched', 'Completed'];

function getStatusStyle(status) {
  switch (status) {
    case 'Pending Reply': return 'bg-amber-400/20 text-amber-200 border-amber-400/40';
    case 'Contacted':    return 'bg-cyan-400/20 text-cyan-200 border-cyan-400/40';
    case 'Confirmed':   return 'bg-emerald-400/20 text-emerald-200 border-emerald-400/40';
    case 'Dispatched':  return 'bg-purple-400/20 text-purple-200 border-purple-400/40';
    case 'Completed':   return 'bg-white/10 text-white/50 border-white/20';
    default:            return 'bg-white/10 text-white/50 border-white/20';
  }
}

export default function OrderDetailModal({ order, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(order.status);
  const [saved, setSaved] = useState(false);

  if (!order) return null;

  const handleSave = () => {
    onUpdateStatus(order.id, status);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass rounded-3xl border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono text-sm font-black text-white bg-white/10 px-2.5 py-0.5 rounded">
                {order.id}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>
            </div>
            <h2 className="text-xl font-black text-white">{order.customerName}</h2>
            <div className="flex items-center gap-1.5 text-white/50 text-xs mt-0.5">
              <Clock className="w-3 h-3" />
              {new Date(order.createdAt).toLocaleString([], {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass hover:bg-white/20 text-white/60 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Order summary */}
          <div className="glass-dark rounded-2xl p-4 border border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Order Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-white/40 text-xs mb-0.5">Product</div>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  {order.productType === 'live'
                    ? <Fish className="w-4 h-4 text-cyan-300" />
                    : <Flame className="w-4 h-4 text-amber-300" />}
                  {order.batchTier}
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5">Preparation</div>
                <div className="text-white font-semibold">{order.prepOption}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5">Estimated Total</div>
                <div className="text-emerald-300 font-black text-xl">
                  ₦{order.estimatedPrice?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5">Dispatch Window</div>
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-white/40" />
                  {order.preferredDate}
                </div>
              </div>
            </div>
          </div>

          {/* Customer contact */}
          <div className="glass-dark rounded-2xl p-4 border border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Customer Contact</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg glass">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                </div>
                <div>
                  <div className="text-white/40 text-[10px]">Phone / WhatsApp</div>
                  <div className="text-white font-semibold">{order.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg glass mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-white/60" />
                </div>
                <div>
                  <div className="text-white/40 text-[10px]">Delivery Address</div>
                  <div className="text-white font-semibold">{order.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="glass-dark rounded-2xl p-4 border border-amber-400/20">
              <div className="text-amber-300/70 text-xs uppercase tracking-wider font-semibold mb-2">Customer Notes</div>
              <p className="text-white/80 text-sm italic leading-relaxed">"{order.notes}"</p>
            </div>
          )}

          {/* Status Update */}
          <div className="glass-dark rounded-2xl p-4 border border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Update Status</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    status === s
                      ? getStatusStyle(s) + ' scale-[1.02]'
                      : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 btn-ocean py-3 text-sm flex items-center justify-center gap-2"
              >
                {saved
                  ? <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Saved!</>
                  : <><Save className="w-4 h-4" /> Save Status</>}
              </button>
              <a
                href={getFarmerReplyWhatsAppUrl(order)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500/80 hover:bg-green-500 text-white font-bold px-4 py-3 rounded-2xl text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Reply</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
