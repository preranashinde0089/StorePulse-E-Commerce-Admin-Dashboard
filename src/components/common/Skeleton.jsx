import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return <div className={`animate-pulse bg-slate-200/80 rounded-md ${className}`} />;
};

export const TableRowSkeleton = ({ columns = 6 }) => {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-slate-200 rounded w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
      <div className="h-28 bg-slate-100 rounded w-full mb-3" />
      <div className="h-4 bg-slate-200 rounded w-2/3" />
    </div>
  );
};

export const MetricCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 animate-pulse flex items-center justify-between">
      <div className="space-y-2.5 flex-1">
        <div className="h-3.5 bg-slate-200 rounded w-24" />
        <div className="h-7 bg-slate-200 rounded w-32" />
        <div className="h-3 bg-slate-100 rounded w-28" />
      </div>
      <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
    </div>
  );
};
