import React from 'react';
import { TrendingUp, Fish, Flame, DollarSign, Clock, Package } from 'lucide-react';

function StatCard({ label, value, sub, icon: Icon, color = 'text-white' }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/15">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-xl glass">
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-white/80 text-sm font-semibold mt-0.5">{label}</div>
      {sub && <div className="text-white/40 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export default function AnalyticsPanel({ orders }) {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.estimatedPrice || 0), 0);
  const completedOrders = orders.filter((o) => o.status === 'Completed');
  const completedRevenue = completedOrders.reduce((sum, o) => sum + (o.estimatedPrice || 0), 0);
  const liveOrders = orders.filter((o) => o.productType === 'live');
  const smokedOrders = orders.filter((o) => o.productType === 'smoked');
  const pendingOrders = orders.filter((o) => o.status === 'Pending Reply');
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Recent 7 orders for mini activity list
  const recent = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  // Status distribution
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = [
    { label: 'Pending Reply', color: 'bg-amber-400' },
    { label: 'Contacted', color: 'bg-cyan-400' },
    { label: 'Confirmed', color: 'bg-emerald-400' },
    { label: 'Dispatched', color: 'bg-purple-400' },
    { label: 'Completed', color: 'bg-white/30' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Analytics Overview</h2>
        <p className="text-white/50 text-sm mt-1">Live stats based on orders in this queue.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard
          label="Pipeline Value"
          value={`₦${(totalRevenue / 1000).toFixed(0)}k`}
          sub="All orders combined"
          icon={DollarSign}
          color="text-emerald-300"
        />
        <StatCard
          label="Confirmed Revenue"
          value={`₦${(completedRevenue / 1000).toFixed(0)}k`}
          sub={`${completedOrders.length} completed`}
          icon={TrendingUp}
          color="text-cyan-300"
        />
        <StatCard
          label="Avg Order Value"
          value={`₦${avgOrderValue.toLocaleString()}`}
          sub="Per ticket"
          icon={Package}
          color="text-amber-300"
        />
        <StatCard
          label="Live Catfish"
          value={liveOrders.length}
          sub={`₦${(liveOrders.reduce((s, o) => s + (o.estimatedPrice || 0), 0) / 1000).toFixed(0)}k value`}
          icon={Fish}
          color="text-cyan-300"
        />
        <StatCard
          label="Smoked Catfish"
          value={smokedOrders.length}
          sub={`₦${(smokedOrders.reduce((s, o) => s + (o.estimatedPrice || 0), 0) / 1000).toFixed(0)}k value`}
          icon={Flame}
          color="text-amber-300"
        />
        <StatCard
          label="Awaiting Reply"
          value={pendingOrders.length}
          sub="Need callback now"
          icon={Clock}
          color="text-red-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status distribution */}
        <div className="glass rounded-2xl p-5 border border-white/15">
          <h3 className="text-white font-semibold text-sm mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {statuses.map(({ label, color }) => {
              const count = statusCounts[label] || 0;
              const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/60">{label}</span>
                    <span className="text-white font-semibold">{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="glass rounded-2xl p-5 border border-white/15">
          <h3 className="text-white font-semibold text-sm mb-4">Recent Activity</h3>
          <div className="space-y-2.5">
            {recent.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-4">No orders yet.</p>
            ) : (
              recent.map((o) => (
                <div key={o.id} className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg glass shrink-0">
                    {o.productType === 'live'
                      ? <Fish className="w-3 h-3 text-cyan-300" />
                      : <Flame className="w-3 h-3 text-amber-300" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-semibold truncate">{o.customerName}</div>
                    <div className="text-white/40 text-[10px]">{o.batchTier}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-white text-xs font-bold">₦{(o.estimatedPrice / 1000).toFixed(0)}k</div>
                    <div className="text-white/40 text-[10px]">
                      {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
