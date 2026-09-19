import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, MessageSquare, X } from 'lucide-react';
import { getCustomerWhatsAppUrl } from '../../utils/whatsapp';

export default function SuccessModal({ submittedTicket, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!submittedTicket) return null;

  const copyId = () => {
    navigator.clipboard.writeText(submittedTicket.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div className="relative w-full max-w-md glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/25">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Success icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-300" />
          </div>
          <h3 className="text-2xl font-black text-white">You're in the Queue!</h3>
          <p className="text-white/60 text-sm mt-1">We'll call you within 6 minutes.</p>
        </div>

        {/* Ticket ID */}
        <div className="glass-dark rounded-2xl p-5 text-center mb-5 border border-white/20">
          <div className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">
            Queue Ticket
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-3xl font-black text-white tracking-wide">
              #{submittedTicket.id}
            </span>
            <button
              onClick={copyId}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Copy ticket ID"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/70" />}
            </button>
          </div>
          <div className="text-white/40 text-xs mt-2">
            Avg. callback · <span className="text-white/70 font-semibold">Under 10 min</span>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-sm border-t border-white/15 pt-4 mb-5">
          {[
            ['Customer', submittedTicket.customerName],
            ['Product', submittedTicket.batchTier],
            ['Style', submittedTicket.prepOption],
            ['Total', `₦${submittedTicket.estimatedPrice?.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-white/50">{label}</span>
              <span className="text-white font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <a
            href={getCustomerWhatsAppUrl(submittedTicket)}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 px-4 rounded-2xl text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <button
            onClick={onClose}
            className="btn-outline w-full py-3 text-sm"
          >
            Return to Store
          </button>
        </div>
      </div>
    </div>
  );
}
