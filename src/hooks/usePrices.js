import { useState, useEffect } from 'react';
import { LIVE_TIERS, SMOKED_TIERS } from '../data/catalog';

const PRICES_KEY = 'wp_catfish_prices_v1';

function buildDefaultPrices() {
  const map = {};
  [...LIVE_TIERS, ...SMOKED_TIERS].forEach((t) => {
    map[t.id] = { price: t.price, available: true };
  });
  return map;
}

export function usePrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PRICES_KEY);
      if (stored) {
        setPrices(JSON.parse(stored));
      } else {
        const defaults = buildDefaultPrices();
        setPrices(defaults);
        localStorage.setItem(PRICES_KEY, JSON.stringify(defaults));
      }
    } catch {
      setPrices(buildDefaultPrices());
    }
  }, []);

  const savePrices = (updated) => {
    setPrices(updated);
    try {
      localStorage.setItem(PRICES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Price save error:', e);
    }
  };

  /** Update a single tier's price */
  const updatePrice = (tierId, newPrice) => {
    const updated = { ...prices, [tierId]: { ...prices[tierId], price: Number(newPrice) } };
    savePrices(updated);
  };

  /** Toggle a tier's availability on/off */
  const toggleAvailability = (tierId) => {
    const updated = {
      ...prices,
      [tierId]: { ...prices[tierId], available: !prices[tierId]?.available },
    };
    savePrices(updated);
  };

  /** Reset all prices back to catalog defaults */
  const resetToDefaults = () => {
    const defaults = buildDefaultPrices();
    savePrices(defaults);
  };

  /**
   * Merge dynamic prices into a tier array.
   * Returns tiers with live prices & availability from localStorage.
   */
  const applyPrices = (tiers) =>
    tiers.map((t) => ({
      ...t,
      price: prices[t.id]?.price ?? t.price,
      available: prices[t.id]?.available ?? true,
    }));

  return { prices, updatePrice, toggleAvailability, resetToDefaults, applyPrices };
}
