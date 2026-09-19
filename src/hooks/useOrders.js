import { useState, useEffect } from 'react';
import { SEED_ORDERS } from '../data/catalog';

const STORAGE_KEY = 'wp_catfish_orders_v2';

export function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders(SEED_ORDERS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
      setOrders(SEED_ORDERS);
    }
  }, []);

  const saveOrders = (updatedList) => {
    setOrders(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Local storage write error:', e);
    }
  };

  const addOrder = (orderData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: `CAT-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Reply',
      ...orderData
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    return newOrder;
  };

  const updateOrderStatus = (id, newStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    saveOrders(updated);
  };

  const deleteOrder = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    saveOrders(updated);
  };

  const pendingCount = orders.filter((o) => o.status === 'Pending Reply').length;
  const activeHarvestCount = orders.filter((o) => ['Contacted', 'Confirmed'].includes(o.status)).length;
  const totalCount = orders.length;

  return {
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    pendingCount,
    activeHarvestCount,
    totalCount
  };
}
