import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_CUSTOMERS } from '../utils/mockData';
import { storage } from '../services/storage';
import { useToast } from './ToastContext';

const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const saved = storage.getCustomers();
    return saved || INITIAL_CUSTOMERS;
  });

  const { showToast } = useToast();

  const getCustomerById = (id) => {
    return customers.find((c) => c.id === id) || null;
  };

  const updateCustomerStatus = (id, newStatus) => {
    const updated = customers.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setCustomers(updated);
    storage.setCustomers(updated);
    showToast(`Customer status updated to ${newStatus}`, 'success');
  };

  const resetCustomers = () => {
    localStorage.removeItem('storepulse_customers');
    setCustomers(INITIAL_CUSTOMERS);
    showToast('Customer records reset to demo defaults.', 'info');
  };

  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const vipCustomers = customers.filter((c) => c.status === 'VIP').length;
    const activeCustomers = customers.filter((c) => c.status === 'Active' || c.status === 'VIP').length;
    const totalSpentAll = customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0);

    return {
      totalCustomers,
      vipCustomers,
      activeCustomers,
      totalSpentAll,
    };
  }, [customers]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        stats,
        getCustomerById,
        updateCustomerStatus,
        resetCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};
