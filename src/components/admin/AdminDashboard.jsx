import React, { useState } from 'react';
import { ClipboardList, Tag, BarChart2, Search, Fish, Layers } from 'lucide-react';
import OrderCard from './OrderCard';
import OrderDetailModal from './OrderDetailModal';
import PricingPanel from './PricingPanel';
import AnalyticsPanel from './AnalyticsPanel';
import { STATUS_LIST } from '../../data/catalog';

const TABS = [
  { id: 'orders',    label: 'Orders',    icon: ClipboardList },
  { id: 'pricing',   label: 'Pricing',   icon: Tag          },
  { id: 'analytics', label: 'Analytics', icon: BarChart2    },
];

export default function AdminDashboard({
  orders,
  onUpdateStatus,
  onDeleteOrder,
  pendingCount,
  activeHarvestCount,
  totalCount,
  prices,
  onUpdatePrice,
  onToggleAvailability,
  onResetPricingDefaults,
}) {
  const [activeTab, setActiveTab] = useState('orders');
  const [adminSearch, setAdminSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((ord) => {
    const matchSearch =
      ord.customerName?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      ord.id?.toLowerCase().includes(adminSearch.toLowerCase()) ||
      ord.phone?.includes(adminSearch);
    const matchStatus = statusFilter === 'ALL' || ord.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <main className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 md:px-10 py-6 sm:py-8">

      {/* ─── Top Header Card ─── */}
      <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 border border-white/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm mb-1.5">
              <Layers className="w-4 h-4" />
              <span>Manager Dashboard · Whiskers &amp; Ponds</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Admin Control Panel</h1>
            <p className="text-white/50 text-xs sm:text-sm mt-1">
              Manage orders, edit pricing, and track performance.
            </p>
          </div>

          {/* Metric chips */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
            {[
              { label: 'Pending',  value: pendingCount,       color: 'text-amber-300' },
              { label: 'Active',   value: activeHarvestCount, color: 'text-cyan-300'  },
              { label: 'Total',    value: totalCount,         color: 'text-white'     },
            ].map((m) => (
              <div key={m.label} className="glass-dark rounded-xl px-2.5 sm:px-4 py-2 sm:py-3 text-center border border-white/10">
                <div className="text-[9px] sm:text-[10px] text-white/40 font-semibold uppercase tracking-wider">{m.label}</div>
                <div className={`text-xl sm:text-2xl font-black mt-0.5 ${m.color}`}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="flex items-center gap-1.5 glass rounded-2xl p-1.5 mb-6 border border-white/15 overflow-x-auto max-w-full">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 whitespace-nowrap ${
              activeTab === id
                ? 'bg-white text-teal-700 shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{label}</span>
            {id === 'orders' && pendingCount > 0 && (
              <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center ${
                activeTab === 'orders' ? 'bg-amber-500 text-white' : 'bg-amber-400/30 text-amber-300'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── ORDERS TAB ─── */}
      {activeTab === 'orders' && (
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search ticket, name, phone..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="ocean-input pl-10"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 flex-wrap">
              {STATUS_LIST.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? 'bg-white text-teal-700 font-bold shadow-sm'
                      : 'glass text-white/65 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {st}
                  {st === 'ALL' && (
                    <span className="ml-1.5 text-[10px] opacity-60">({orders.length})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Order list */}
          {filteredOrders.length === 0 ? (
            <div className="glass rounded-2xl p-14 text-center border border-white/10">
              <Fish className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 font-medium">No orders match your filter.</p>
              <p className="text-white/30 text-sm mt-1">Try clearing the search or status filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((ord, idx) => (
                <OrderCard
                  key={ord.id}
                  order={ord}
                  index={idx}
                  onUpdateStatus={onUpdateStatus}
                  onDeleteOrder={onDeleteOrder}
                  onViewDetail={() => setSelectedOrder(ord)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── PRICING TAB ─── */}
      {activeTab === 'pricing' && (
        <PricingPanel
          prices={prices}
          onUpdatePrice={onUpdatePrice}
          onToggleAvailability={onToggleAvailability}
          onResetDefaults={onResetPricingDefaults}
        />
      )}

      {/* ─── ANALYTICS TAB ─── */}
      {activeTab === 'analytics' && (
        <AnalyticsPanel orders={orders} />
      )}

      {/* ─── Order Detail Modal ─── */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(id, status) => {
            onUpdateStatus(id, status);
            setSelectedOrder((prev) => prev ? { ...prev, status } : null);
          }}
        />
      )}
    </main>
  );
}
