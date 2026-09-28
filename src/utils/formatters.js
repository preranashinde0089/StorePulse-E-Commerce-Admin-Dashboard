// Currency and number formatters
export const formatCurrency = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

export const formatNumber = (num) => {
  const numericValue = typeof num === 'number' ? num : parseInt(num, 10) || 0;
  return new Intl.NumberFormat('en-US').format(numericValue);
};

export const formatPercent = (percent) => {
  const numericValue = typeof percent === 'number' ? percent : parseFloat(percent) || 0;
  const prefix = numericValue > 0 ? '+' : '';
  return `${prefix}${numericValue.toFixed(1)}%`;
};

// Date formatters
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Status styling helpers
export const getStatusVariant = (status) => {
  const s = String(status).toLowerCase();
  switch (s) {
    case 'delivered':
    case 'completed':
    case 'paid':
    case 'active':
    case 'in stock':
      return 'success';
    case 'shipped':
    case 'processing':
    case 'low stock':
    case 'pending':
      return 'warning';
    case 'cancelled':
    case 'failed':
    case 'refunded':
    case 'out of stock':
    case 'inactive':
      return 'danger';
    case 'draft':
    case 'archived':
      return 'neutral';
    case 'vip':
      return 'primary';
    default:
      return 'neutral';
  }
};
