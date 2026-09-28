import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TOAST_STYLES = {
  success: 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-emerald-900/5',
  error: 'bg-rose-50 text-rose-900 border-rose-200 shadow-rose-900/5',
  warning: 'bg-amber-50 text-amber-900 border-amber-200 shadow-amber-900/5',
  info: 'bg-indigo-50 text-indigo-900 border-indigo-200 shadow-indigo-900/5',
};

const ICON_STYLES = {
  success: 'text-emerald-600',
  error: 'text-rose-600',
  warning: 'text-amber-600',
  info: 'text-indigo-600',
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const Icon = TOAST_ICONS[toast.type] || Info;
        const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
        const iconStyle = ICON_STYLES[toast.type] || ICON_STYLES.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${style}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconStyle}`} />
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
