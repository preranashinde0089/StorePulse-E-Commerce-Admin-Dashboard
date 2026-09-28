import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const TopProductsList = ({ products = [] }) => {
  // Sort by salesCount or rating to showcase bestsellers
  const topProducts = [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Top Selling Products</h3>
          <p className="text-xs text-slate-500 mt-0.5">Highest volume catalog items</p>
        </div>
        <Link
          to="/products"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 hover:underline"
        >
          View catalog
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {topProducts.map((product, idx) => (
          <div key={product.id || idx} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-5 text-center text-xs font-bold text-slate-400">
                #{idx + 1}
              </span>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-11 h-11 rounded-lg object-contain bg-slate-50 border border-slate-200/60 p-1 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-900 truncate max-w-[160px] sm:max-w-[200px]">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] capitalize text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {product.rating ? Number(product.rating).toFixed(1) : '4.5'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-slate-900">{formatCurrency(product.price)}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {formatNumber(product.salesCount || 120)} sold
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
