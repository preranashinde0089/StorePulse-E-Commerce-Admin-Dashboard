import React from 'react';

const VARIANTS = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-emerald-500/20',
  warning: 'bg-amber-50 text-amber-700 border-amber-200/60 ring-amber-500/20',
  danger: 'bg-rose-50 text-rose-700 border-rose-200/60 ring-rose-500/20',
  primary: 'bg-indigo-50 text-indigo-700 border-indigo-200/60 ring-indigo-500/20',
  info: 'bg-sky-50 text-sky-700 border-sky-200/60 ring-sky-500/20',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200/70 ring-slate-400/20',
};

const DOT_COLORS = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  primary: 'bg-indigo-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-400',
};

export const Badge = ({
  children,
  variant = 'neutral',
  dot = false,
  size = 'sm',
  className = '',
}) => {
  const variantClass = VARIANTS[variant] || VARIANTS.neutral;
  const dotColor = DOT_COLORS[variant] || DOT_COLORS.neutral;
  const sizeClass = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantClass} ${sizeClass} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />}
      {children}
    </span>
  );
};
