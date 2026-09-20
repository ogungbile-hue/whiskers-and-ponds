import React, { useState, useEffect } from 'react';
import AquaticBackground from './components/common/AquaticBackground';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/customer/HomePage';
import ProductsPage from './components/customer/ProductsPage';
import OrderPage from './components/customer/OrderPage';
import SuccessModal from './components/customer/SuccessModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { LIVE_TIERS, SMOKED_TIERS, LIVE_PREP_OPTIONS, SMOKED_PREP_OPTIONS } from './data/catalog';
import { useOrders } from './hooks/useOrders';
import { usePrices } from './hooks/usePrices';
import { useRouter } from './hooks/useRouter';

export const ADMIN_PATH = '/admindb';
export const STORE_PATH = '/';
export const PRODUCTS_PATH = '/products';
export const ORDER_PATH = '/order';

export default function App() {
  const { pathname, navigate } = useRouter();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

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
  const liveTiers = applyPrices(LIVE_TIERS).filter((t) => t.available);
  const smokedTiers = applyPrices(SMOKED_TIERS).filter((t) => t.available);

  // Default tier selection
  useEffect(() => {
    const tiers = selectedProduct === 'live' ? liveTiers : smokedTiers;
    const defaultTier = tiers.find((t) => t.popular) || tiers[0] || null;
    setSelectedTier(defaultTier);
    setSelectedPrep(
      selectedProduct === 'live' ? LIVE_PREP_OPTIONS[0].id : SMOKED_PREP_OPTIONS[0].id
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  // Keep selectedTier fresh if admin updates prices
  useEffect(() => {
    if (!selectedTier) return;
    const tiers = selectedProduct === 'live' ? liveTiers : smokedTiers;
    const fresh = tiers.find((t) => t.id === selectedTier.id);
    if (fresh) setSelectedTier(fresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices]);

  const handleOrderSubmitted = (orderData) => {
    const newOrder = addOrder(orderData);
    setSubmittedTicket(newOrder);
  };

  const handleDeleteWithConfirm = (id) => {
    if (window.confirm(`Remove ticket #${id} from the queue?`)) {
      deleteOrder(id);
    }
  };

  const handleSelectTierAndOrder = (tier, productType) => {
    if (productType) setSelectedProduct(productType);
    setSelectedTier(tier);
    navigate(ORDER_PATH);
  };

  const handleSelectProductAndOrder = (productType) => {
    setSelectedProduct(productType);
    navigate(ORDER_PATH);
  };

  const liveStartingPrice = liveTiers.length ? Math.min(...liveTiers.map((t) => t.price)) : 19500;
  const smokedStartingPrice = smokedTiers.length ? Math.min(...smokedTiers.map((t) => t.price)) : 14500;

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-white/30 selection:text-white flex flex-col">
      <AquaticBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          currentPath={pathname}
          onGoHome={() => navigate(STORE_PATH)}
          onGoProducts={() => navigate(PRODUCTS_PATH)}
          onGoOrder={() => navigate(ORDER_PATH)}
          onGoAdmin={() => navigate(ADMIN_PATH)}
          pendingCount={pendingCount}
        />

        <main className="flex-1">
          {pathname === ADMIN_PATH ? (
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
          ) : pathname === PRODUCTS_PATH ? (
            <ProductsPage
              liveTiers={liveTiers}
              smokedTiers={smokedTiers}
              onSelectTierAndOrder={handleSelectTierAndOrder}
              onGoOrder={() => navigate(ORDER_PATH)}
            />
          ) : pathname === ORDER_PATH ? (
            <OrderPage
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
              selectedPrep={selectedPrep}
              setSelectedPrep={setSelectedPrep}
              liveTiers={liveTiers}
              smokedTiers={smokedTiers}
              onOrderSubmitted={handleOrderSubmitted}
              onGoProducts={() => navigate(PRODUCTS_PATH)}
            />
          ) : (
            <HomePage
              onGoOrder={() => navigate(ORDER_PATH)}
              onGoProducts={() => navigate(PRODUCTS_PATH)}
              onSelectProductAndOrder={handleSelectProductAndOrder}
              liveStartingPrice={liveStartingPrice}
              smokedStartingPrice={smokedStartingPrice}
            />
          )}
        </main>

        <Footer
          onGoHome={() => navigate(STORE_PATH)}
          onGoProducts={() => navigate(PRODUCTS_PATH)}
          onGoOrder={() => navigate(ORDER_PATH)}
          onOpenAdmin={() => navigate(ADMIN_PATH)}
        />
      </div>

      <SuccessModal
        submittedTicket={submittedTicket}
        onClose={() => setSubmittedTicket(null)}
      />
    </div>
  );
}
