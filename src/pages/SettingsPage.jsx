import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useCustomers } from '../context/CustomerContext';
import { useToast } from '../context/ToastContext';
import { storage } from '../services/storage';
import { Button } from '../components/common/Button';
import {
  Store,
  Bell,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { resetProducts } = useProducts();
  const { resetOrders } = useOrders();
  const { resetCustomers } = useCustomers();
  const { showToast } = useToast();

  const [settings, setSettings] = useState(() => storage.getSettings());
  const [isResetting, setIsResetting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      storage.setSettings(settings);
      setIsSaving(false);
      showToast('Store settings saved successfully!', 'success');
    }, 400);
  };

  const handleResetAllData = async () => {
    if (window.confirm('Reset all catalog items, orders, and customer records back to initial demo data?')) {
      setIsResetting(true);
      try {
        await resetProducts();
        resetOrders();
        resetCustomers();
        showToast('All data has been reset to defaults.', 'success');
      } catch {
        showToast('Failed to reset data.', 'error');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Store Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your e-commerce platform configurations, notifications, and demo state.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'}
            alt={user?.name || 'Administrator'}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{user?.name || 'Administrator'}</h3>
            <p className="text-xs text-slate-500">{user?.email || 'admin@storepulse.io'}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              {user?.role || 'Store Administrator'}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Role: Full Write &amp; Manage Permissions
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Store Information */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Store className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              General Store Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Primary Currency
              </label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="USD ($)">USD ($) - United States Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="UTC-05:00 Eastern Time">UTC-05:00 Eastern Time (US &amp; Canada)</option>
                <option value="UTC-08:00 Pacific Time">UTC-08:00 Pacific Time (US &amp; Canada)</option>
                <option value="UTC+00:00 London">UTC+00:00 London, GMT</option>
                <option value="UTC+05:30 IST">UTC+05:30 India Standard Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications & Automation */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-900">New Order Alerts</p>
                <p className="text-xs text-slate-500">Receive in-app alerts when a shopper completes checkout.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.orderNotifications}
                onChange={() => handleToggle('orderNotifications')}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-900">Low Stock Warnings</p>
                <p className="text-xs text-slate-500">Trigger warnings when product inventory falls below 10 units.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.lowStockAlerts}
                onChange={() => handleToggle('lowStockAlerts')}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" loading={isSaving}>
            Save Preferences
          </Button>
        </div>
      </form>

      {/* Danger Zone: Reset Demo Data */}
      <div className="bg-rose-50/50 rounded-xl border border-rose-200/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-rose-900">Reset Demo Catalog &amp; Data</h3>
            <p className="text-xs text-rose-700 mt-1 max-w-lg leading-relaxed">
              If you have added, updated, or deleted items while testing this portfolio demo, click below to restore all products, orders, and customer records to their pristine initial states.
            </p>
          </div>
          <Button
            type="button"
            variant="danger"
            size="md"
            icon={RotateCcw}
            onClick={handleResetAllData}
            loading={isResetting}
            className="shrink-0"
          >
            Reset All Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
};
