import React from 'react';
import { Fish, Flame, Clock, MapPin, Calendar, MessageSquare, Trash2, Eye } from 'lucide-react';
import { getFarmerReplyWhatsAppUrl } from '../../utils/whatsapp';

function getStatusStyle(status) {
  switch (status) {
    case 'Pending Reply': return 'bg-amber-400/20 text-amber-200 border-amber-400/30';
    case 'Contacted':    return 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30';
    case 'Confirmed':   return 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30';
    case 'Dispatched':  return 'bg-purple-400/20 text-purple-200 border-purple-400/30';
    case 'Completed':   return 'bg-white/10 text-white/50 border-white/20';
    default:            return 'bg-white/10 text-white/50 border-white/20';
  }
}

export default function OrderCard({ order, index, onUpdateStatus, onDeleteOrder, onViewDetail }) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 transition-all hover:bg-white/15 border border-white/10 hover:border-white/25">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* Left: Details */}
        <div className="flex items-start gap-4">
          {/* Index badge */}
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-white/70 mt-0.5">
            {index + 1}
          </div>

          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded">
                {order.id}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Customer name */}
            <h2 className="text-base font-bold text-white">
              {order.customerName}
              <span className="text-xs font-normal text-white/40 ml-2">({order.phone})</span>
            </h2>

            {/* Product info */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mt-1">
              {order.productType === 'live'
                ? <Fish className="w-3.5 h-3.5 text-cyan-300" />
                : <Flame className="w-3.5 h-3.5 text-amber-300" />}
              <span className="text-white/80 font-semibold">{order.batchTier}</span>
              <span className="text-white/30">·</span>
              <span>{order.prepOption}</span>
              <span className="text-white/30">·</span>
              <span className="text-green-300 font-bold">₦{order.estimatedPrice?.toLocaleString()}</span>
            </div>

            {/* Location & Date */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45 mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/40" />
                {order.address}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-white/40" />
                {order.preferredDate}
              </span>
            </div>

            {/* Notes */}
            {order.notes && (
              <p className="mt-2 text-xs text-white/50 italic border-l-2 border-white/20 pl-2.5">
                "{order.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 border-white/10 pt-3 lg:pt-0">
          <button
            onClick={onViewDetail}
            className="flex items-center gap-1.5 glass px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/20 border border-white/15 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Details
          </button>
          <a
            href={getFarmerReplyWhatsAppUrl(order)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-green-500/80 hover:bg-green-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Reply on WhatsApp
          </a>

          <div className="flex items-center gap-1.5">
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              className="ocean-input py-1.5 px-2.5 text-xs rounded-lg cursor-pointer"
              style={{ width: 'auto', minWidth: 120 }}
            >
              {['Pending Reply', 'Contacted', 'Confirmed', 'Dispatched', 'Completed'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => onDeleteOrder(order.id)}
              className="p-1.5 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-300 transition-colors border border-red-400/20"
              title="Remove"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
