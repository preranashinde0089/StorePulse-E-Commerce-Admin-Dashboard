import React from 'react';
import { Edit2, Trash2, Star } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, getStatusVariant } from '../../utils/formatters';

export const ProductGrid = ({
  products = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => {
        const stockStatus =
          product.stock === 0
            ? 'Out of Stock'
            : product.stock < 10
            ? 'Low Stock'
            : 'In Stock';

        return (
          <div
            key={product.id}
            className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Badges */}
              <div className="relative aspect-4/3 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={product.thumbnail || 'https://via.placeholder.com/200'}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5">
                  <Badge variant={getStatusVariant(stockStatus)} dot size="xs">
                    {stockStatus}
                  </Badge>
                </div>
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="capitalize">{product.category}</span>
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {product.rating ? Number(product.rating).toFixed(1) : '—'}
                  </span>
                </div>

                <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 mb-1" title={product.title}>
                  {product.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {product.description || 'No description provided.'}
                </p>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                  <div className="text-base font-bold text-slate-900">
                    {formatCurrency(product.price)}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="px-4 py-3 bg-slate-50/75 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(product)}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
