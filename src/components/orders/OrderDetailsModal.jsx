import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { OrderStatusBadge, PaymentStatusBadge } from './OrderStatusBadge';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { User, MapPin, CreditCard, Package } from 'lucide-react';

const ORDER_STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) => {
  if (!order) return null;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order ${order.id}`}
      description={`Placed on ${formatDateTime(order.date)}`}
      maxWidth="max-w-2xl"
      footer={
        <Button variant="primary" onClick={onClose}>
          Done
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Status & Quick Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-1">Current Order Status</span>
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.orderStatus} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Update Status:</label>
            <select
              value={order.orderStatus}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              className="text-xs font-medium bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-xs"
            >
              {ORDER_STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer & Shipping Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-3">
              <User className="w-4 h-4 text-indigo-600" />
              Customer Details
            </div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">{order.customer.name}</p>
                <p className="text-xs text-slate-500">{order.customer.email}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1">{order.customer.phone}</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-3">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Shipping Address
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {order.customer.address}
            </p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              {order.paymentMethod || 'Credit Card'}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-indigo-600" />
            Ordered Items ({order.items.length})
          </h4>

          <div className="border border-slate-200/80 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200/80 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Item</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Price</th>
                  <th className="py-2.5 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-9 h-9 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5 shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40';
                          }}
                        />
                        <span className="font-medium text-slate-900 truncate max-w-xs">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 font-semibold">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total breakdown */}
            <div className="bg-slate-50/75 p-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Order Total</span>
                <span className="text-indigo-600">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
