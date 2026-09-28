// LocalStorage persistence service for StorePulse Admin

const STORAGE_KEYS = {
  PRODUCTS: 'storepulse_products',
  ORDERS: 'storepulse_orders',
  CUSTOMERS: 'storepulse_customers',
  AUTH: 'storepulse_auth',
  SETTINGS: 'storepulse_settings',
};

export const storage = {
  // Products
  getProducts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get products from storage', e);
      return null;
    }
  },
  setProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to set products in storage', e);
    }
  },

  // Orders
  getOrders: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get orders from storage', e);
      return null;
    }
  },
  setOrders: (orders) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to set orders in storage', e);
    }
  },

  // Customers
  getCustomers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get customers from storage', e);
      return null;
    }
  },
  setCustomers: (customers) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch (e) {
      console.error('Failed to set customers in storage', e);
    }
  },

  // Auth User
  getAuth: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get auth from storage', e);
      return null;
    }
  },
  setAuth: (authData) => {
    try {
      if (authData) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authData));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      }
    } catch (e) {
      console.error('Failed to set auth in storage', e);
    }
  },
  removeAuth: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch (e) {
      console.error('Failed to remove auth from storage', e);
    }
  },

  // Settings
  getSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        storeName: 'StorePulse Electronics & Lifestyle',
        supportEmail: 'support@storepulse.io',
        currency: 'USD ($)',
        timezone: 'UTC-05:00 Eastern Time',
        orderNotifications: true,
        lowStockAlerts: true,
        marketingEmails: false,
      };
    } catch {
      return null;
    }
  },
  setSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  // Reset all stored data to defaults
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        // preserve auth if desired or clear
        if (key !== STORAGE_KEYS.AUTH) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  },
};
