import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate, getStatusVariant } from '../../utils/formatters';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export const CustomerDetailsModal = ({
  isOpen,
  onClose,
  customer,
  onStatusChange,
}) => {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Profile"
      description={`Customer Account #${customer.id}`}
      maxWidth="max-w-xl"
      footer={
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Header Profile card */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 truncate">{customer.name}</h4>
              <Badge variant={getStatusVariant(customer.status)} dot size="xs">
                {customer.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{customer.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
              <Calendar className="w-3.5 h-3.5" />
              Customer since {formatDate(customer.joinDate)}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white text-center">
            <span className="text-xs text-slate-500 font-medium">Total Orders Placed</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{customer.ordersCount}</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white text-center">
            <span className="text-xs text-slate-500 font-medium">Lifetime Spend</span>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {formatCurrency(customer.totalSpent)}
            </p>
          </div>
        </div>

        {/* Contact info list */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-3 text-xs">
          <div className="flex items-center gap-3 text-slate-700">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{customer.address}</span>
          </div>
        </div>

        {/* Change Status */}
        {onStatusChange && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs">
            <span className="font-semibold text-slate-700">Account Standing:</span>
            <div className="flex gap-1.5">
              {['Active', 'VIP', 'Inactive'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusChange(customer.id, st)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    customer.status === st
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
