import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_ORDERS } from '../utils/mockData';
import { storage } from '../services/storage';
import { useToast } from './ToastContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = storage.getOrders();
    return saved || INITIAL_ORDERS;
  });

  const { showToast } = useToast();

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, orderStatus: newStatus };
      }
      return order;
    });

    setOrders(updated);
    storage.setOrders(updated);
    showToast(`Order ${orderId} status changed to ${newStatus}`, 'success');
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    const updated = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, paymentStatus: newPaymentStatus };
      }
      return order;
    });

    setOrders(updated);
    storage.setOrders(updated);
    showToast(`Payment status for ${orderId} updated to ${newPaymentStatus}`, 'success');
  };

  const resetOrders = () => {
    localStorage.removeItem('storepulse_orders');
    setOrders(INITIAL_ORDERS);
    showToast('Orders reset to demo data.', 'info');
  };

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
      // include paid orders in actual revenue or total volume
      return sum + (order.totalAmount || 0);
    }, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
    const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      pendingOrders,
      deliveredOrders,
    };
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        stats,
        updateOrderStatus,
        updatePaymentStatus,
        resetOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
