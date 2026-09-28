import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate, getStatusVariant } from '../../utils/formatters';

export const RecentOrdersTable = ({ orders = [], onViewOrder }) => {
  const recent = orders.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Recent Orders</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest customer transactions</p>
        </div>
        <Link
          to="/orders"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 hover:underline"
        >
          View all orders
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6 font-semibold">Order</th>
              <th className="py-3 px-6 font-semibold">Customer</th>
              <th className="py-3 px-6 font-semibold">Date</th>
              <th className="py-3 px-6 font-semibold">Total</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recent.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-6 font-medium text-slate-900">{order.id}</td>
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="truncate max-w-[140px]">
                      <p className="text-xs font-medium text-slate-900 truncate">{order.customer.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{order.customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-6 text-xs text-slate-500">{formatDate(order.date)}</td>
                <td className="py-3.5 px-6 font-semibold text-slate-900 text-xs">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="py-3.5 px-6">
                  <Badge variant={getStatusVariant(order.orderStatus)} dot size="xs">
                    {order.orderStatus}
                  </Badge>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <button
                    type="button"
                    onClick={() => onViewOrder && onViewOrder(order)}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
