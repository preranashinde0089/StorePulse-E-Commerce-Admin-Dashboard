import React, { useState, useMemo } from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderStatusBadge, PaymentStatusBadge } from '../components/orders/OrderStatusBadge';
import { OrderDetailsModal } from '../components/orders/OrderDetailsModal';
import { SearchInput } from '../components/common/SearchInput';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency, formatDateTime } from '../utils/formatters';

const STATUS_TABS = ['All', 'Delivered', 'Processing', 'Shipped', 'Pending', 'Cancelled'];

export const OrdersPage = () => {
  const { orders, updateOrderStatus, stats } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtered orders pipeline
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(q);
        const matchName = order.customer.name.toLowerCase().includes(q);
        const matchEmail = order.customer.email.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail) return false;
      }

      // Status tab
      if (selectedStatusTab !== 'All') {
        if (order.orderStatus.toLowerCase() !== selectedStatusTab.toLowerCase()) {
          return false;
        }
      }

      // Payment filter
      if (paymentFilter !== 'all') {
        if (order.paymentStatus.toLowerCase() !== paymentFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [orders, searchQuery, selectedStatusTab, paymentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleTabChange = (tab) => {
    setSelectedStatusTab(tab);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatusTab('All');
    setPaymentFilter('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track customer purchases, fulfillment status, and payment transactions.
          </p>
        </div>

        {/* Quick summary metrics */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 bg-white rounded-lg border border-slate-200 text-xs shadow-xs">
            <span className="text-slate-400">Total Volume:</span>{' '}
            <strong className="text-slate-900">{formatCurrency(stats.totalRevenue)}</strong>
          </div>
          <div className="px-3.5 py-2 bg-indigo-50 rounded-lg border border-indigo-100 text-xs">
            <span className="text-indigo-600">Pending Action:</span>{' '}
            <strong className="text-indigo-900">{stats.pendingOrders} orders</strong>
          </div>
        </div>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {STATUS_TABS.map((tab) => {
              const count =
                tab === 'All'
                  ? orders.length
                  : orders.filter((o) => o.orderStatus.toLowerCase() === tab.toLowerCase()).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedStatusTab === tab
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      selectedStatusTab === tab ? 'bg-indigo-700 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Payment Filter */}
          <div className="flex items-center gap-2.5">
            <div className="w-56 sm:w-64">
              <SearchInput
                value={searchQuery}
                onChange={(val) => {
                  setSearchQuery(val);
                  setCurrentPage(1);
                }}
                placeholder="Search Order ID, name, email..."
              />
            </div>

            <select
              value={paymentFilter}
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-xs"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="No orders found"
            description="No customer orders correspond with your current filter or search criteria."
            actionLabel="Reset filters"
            onAction={clearFilters}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Order ID</th>
                    <th className="py-3.5 px-6 font-semibold">Customer</th>
                    <th className="py-3.5 px-6 font-semibold">Date & Time</th>
                    <th className="py-3.5 px-6 font-semibold">Items</th>
                    <th className="py-3.5 px-6 font-semibold">Total Amount</th>
                    <th className="py-3.5 px-6 font-semibold">Payment</th>
                    <th className="py-3.5 px-6 font-semibold">Fulfillment</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Order ID */}
                      <td className="py-3.5 px-6 font-semibold text-slate-900 font-mono text-xs">
                        {order.id}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                          <div className="truncate max-w-[150px]">
                            <p className="font-semibold text-slate-900 text-xs truncate">
                              {order.customer.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-6 text-xs text-slate-500">
                        {formatDateTime(order.date)}
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-6 text-xs text-slate-600">
                        <span className="font-medium text-slate-900">
                          {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-6 font-bold text-slate-900 text-xs">
                        {formatCurrency(order.totalAmount)}
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-6">
                        <PaymentStatusBadge status={order.paymentStatus} size="xs" />
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6">
                        <OrderStatusBadge status={order.orderStatus} size="xs" />
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(val) => {
                setItemsPerPage(val);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onStatusChange={(id, newStatus) => {
            updateOrderStatus(id, newStatus);
            setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
          }}
        />
      )}
    </div>
  );
};
