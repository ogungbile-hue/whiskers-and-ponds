import React, { useState, useEffect } from 'react';
import AquaticBackground from './components/common/AquaticBackground';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/customer/HeroSection';
import ProductSelector from './components/customer/ProductSelector';
import TierPrepSelector from './components/customer/TierPrepSelector';
import OrderForm from './components/customer/OrderForm';
import SuccessModal from './components/customer/SuccessModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { LIVE_TIERS, SMOKED_TIERS, LIVE_PREP_OPTIONS, SMOKED_PREP_OPTIONS } from './data/catalog';
import { useOrders } from './hooks/useOrders';
import { usePrices } from './hooks/usePrices';
import { useRouter } from './hooks/useRouter';

export const ADMIN_PATH = '/admindb';
export const STORE_PATH = '/';

export default function App() {
  const { pathname, navigate } = useRouter();
  const isAdminView = pathname === ADMIN_PATH;

  const [selectedProduct, setSelectedProduct] = useState('live');
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedPrep, setSelectedPrep] = useState(LIVE_PREP_OPTIONS[0].id);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const {
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    pendingCount,
    activeHarvestCount,
    totalCount,
  } = useOrders();

  const {
    prices,
    updatePrice,
    toggleAvailability,
    resetToDefaults,
    applyPrices,
  } = usePrices();

  // Build dynamic tiers with live prices (filter out unavailable ones for customers)
  const liveTiers   = applyPrices(LIVE_TIERS).filter((t) => t.available);
  const smokedTiers = applyPrices(SMOKED_TIERS).filter((t) => t.available);
  const allLiveTiers   = applyPrices(LIVE_TIERS);
  const allSmokedTiers = applyPrices(SMOKED_TIERS);

  // Set default tier when product changes
  useEffect(() => {
    const tiers = selectedProduct === 'live' ? liveTiers : smokedTiers;
    const defaultTier = tiers.find((t) => t.popular) || tiers[0] || null;
    setSelectedTier(defaultTier);
    setSelectedPrep(
      selectedProduct === 'live' ? LIVE_PREP_OPTIONS[0].id : SMOKED_PREP_OPTIONS[0].id
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  // Keep selectedTier fresh if admin changes its price
  useEffect(() => {
    if (!selectedTier) return;
    const tiers = selectedProduct === 'live' ? liveTiers : smokedTiers;
    const fresh = tiers.find((t) => t.id === selectedTier.id);
    if (fresh) setSelectedTier(fresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  const scrollToOrder = () => {
    const el = document.getElementById('order-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderSubmitted = (orderData) => {
    const newOrder = addOrder(orderData);
    setSubmittedTicket(newOrder);
  };

  const handleDeleteWithConfirm = (id) => {
    if (window.confirm(`Remove ticket #${id} from the queue?`)) {
      deleteOrder(id);
    }
  };

  const goToAdmin = () => navigate(ADMIN_PATH);
  const goToStore = () => navigate(STORE_PATH);

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-white/30 selection:text-white">
      <AquaticBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          isAdminView={isAdminView}
          onGoAdmin={goToAdmin}
          onGoStore={goToStore}
          onOrder={scrollToOrder}
          pendingCount={pendingCount}
        />

        {isAdminView ? (
          <AdminDashboard
            orders={orders}
            onUpdateStatus={updateOrderStatus}
            onDeleteOrder={handleDeleteWithConfirm}
            pendingCount={pendingCount}
            activeHarvestCount={activeHarvestCount}
            totalCount={totalCount}
            prices={prices}
            onUpdatePrice={updatePrice}
            onToggleAvailability={toggleAvailability}
            onResetPricingDefaults={resetToDefaults}
          />
        ) : (
          <main className="flex-1">
            <HeroSection onOrder={scrollToOrder} />
            <ProductSelector
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              liveTiers={allLiveTiers}
              smokedTiers={allSmokedTiers}
            />
            {selectedTier && (
              <>
                <TierPrepSelector
                  selectedProduct={selectedProduct}
                  selectedTier={selectedTier}
                  setSelectedTier={setSelectedTier}
                  selectedPrep={selectedPrep}
                  setSelectedPrep={setSelectedPrep}
                  liveTiers={liveTiers}
                  smokedTiers={smokedTiers}
                />
                <OrderForm
                  selectedProduct={selectedProduct}
                  selectedTier={selectedTier}
                  selectedPrep={selectedPrep}
                  onOrderSubmitted={handleOrderSubmitted}
                />
              </>
            )}
          </main>
        )}

        <Footer onOpenAdmin={goToAdmin} />
      </div>

      <SuccessModal
        submittedTicket={submittedTicket}
        onClose={() => setSubmittedTicket(null)}
      />
    </div>
  );
}
