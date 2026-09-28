import React from 'react';
import { Badge } from '../common/Badge';
import { getStatusVariant } from '../../utils/formatters';

export const OrderStatusBadge = ({ status, size = 'sm' }) => {
  return (
    <Badge variant={getStatusVariant(status)} dot size={size}>
      {status}
    </Badge>
  );
};

export const PaymentStatusBadge = ({ status, size = 'sm' }) => {
  const getPaymentVariant = (st) => {
    switch (String(st).toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
      case 'refunded':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Badge variant={getPaymentVariant(status)} size={size}>
      {status}
    </Badge>
  );
};
