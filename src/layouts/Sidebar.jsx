import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export const Sidebar = ({
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const { stats } = useOrders();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    {
      name: 'Orders',
      path: '/orders',
      icon: ShoppingCart,
      badge: stats.pendingOrders > 0 ? stats.pendingOrders : null,
    },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleNavClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 transition-all duration-300 select-none ${
        collapsed && !isMobile ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Store className="w-5 h-5" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="truncate">
              <span className="text-base font-bold text-white tracking-tight">StorePulse</span>
              <span className="block text-[10px] uppercase font-semibold tracking-widest text-indigo-400">
                Admin SaaS
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Button */}
        {!isMobile && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {(!collapsed || isMobile) ? 'Main Menu' : '•••'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                } ${collapsed && !isMobile ? 'justify-center' : ''}`
              }
              title={collapsed && !isMobile ? item.name : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="truncate flex-1">{item.name}</span>
              )}
              {(!collapsed || isMobile) && item.badge && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User info & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-colors ${
            collapsed && !isMobile ? 'justify-center' : ''
          }`}
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            className="w-9 h-9 rounded-lg object-cover ring-2 ring-slate-700 shrink-0"
          />
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.role || 'Administrator'}</p>
            </div>
          )}
          {(!collapsed || isMobile) && (
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
