import React, { useState, useMemo } from 'react';
import { Eye, Users } from 'lucide-react';
import { useCustomers } from '../context/CustomerContext';
import { CustomerDetailsModal } from '../components/customers/CustomerDetailsModal';
import { Badge } from '../components/common/Badge';
import { SearchInput } from '../components/common/SearchInput';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency, formatDate, getStatusVariant } from '../utils/formatters';

export const CustomersPage = () => {
  const { customers, updateCustomerStatus, stats } = useCustomers();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter pipeline
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = cust.name.toLowerCase().includes(q);
        const matchEmail = cust.email.toLowerCase().includes(q);
        const matchPhone = cust.phone?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (cust.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [customers, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customers Directory</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse registered shoppers, lifetime spend, order frequencies, and account status.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs shadow-xs">
            <span className="text-slate-400">Total:</span>{' '}
            <strong className="text-slate-900">{stats.totalCustomers}</strong>
          </div>
          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-700">
            <span>VIP:</span>{' '}
            <strong>{stats.vipCustomers} members</strong>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search by customer name, email, or phone..."
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label className="text-xs font-semibold text-slate-600">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-xs"
            >
              <option value="all">All Accounts</option>
              <option value="active">Active</option>
              <option value="vip">VIP Tier</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No customers found"
            description="No customer accounts match your search or filter criteria."
            actionLabel="Reset filters"
            onAction={clearFilters}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Customer</th>
                    <th className="py-3.5 px-6 font-semibold">Contact</th>
                    <th className="py-3.5 px-6 font-semibold">Total Orders</th>
                    <th className="py-3.5 px-6 font-semibold">Total Spent</th>
                    <th className="py-3.5 px-6 font-semibold">Joined Date</th>
                    <th className="py-3.5 px-6 font-semibold">Status</th>
                    <th className="py-3.5 px-6 font-semibold text-right">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                          />
                          <div>
                            <p className="font-semibold text-slate-900 text-xs">
                              {customer.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              #{customer.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-3.5 px-6 text-xs text-slate-600">
                        <p className="truncate max-w-[170px] text-slate-800">{customer.email}</p>
                        <p className="text-[11px] text-slate-400">{customer.phone}</p>
                      </td>

                      {/* Orders */}
                      <td className="py-3.5 px-6 text-xs text-slate-800 font-semibold">
                        {customer.ordersCount} orders
                      </td>

                      {/* Total Spent */}
                      <td className="py-3.5 px-6 text-xs font-bold text-slate-900">
                        {formatCurrency(customer.totalSpent)}
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-6 text-xs text-slate-500">
                        {formatDate(customer.joinDate)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6">
                        <Badge variant={getStatusVariant(customer.status)} dot size="xs">
                          {customer.status}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
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
              totalItems={filteredCustomers.length}
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

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          customer={selectedCustomer}
          onStatusChange={(id, newStatus) => {
            updateCustomerStatus(id, newStatus);
            setSelectedCustomer((prev) => ({ ...prev, status: newStatus }));
          }}
        />
      )}
    </div>
  );
};
