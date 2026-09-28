import React from 'react';
import { Edit2, Trash2, Star } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, getStatusVariant } from '../../utils/formatters';

export const ProductTable = ({
  products = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
          <tr>
            <th className="py-3.5 px-6 font-semibold">Product</th>
            <th className="py-3.5 px-6 font-semibold">Category</th>
            <th className="py-3.5 px-6 font-semibold">Price</th>
            <th className="py-3.5 px-6 font-semibold">Stock</th>
            <th className="py-3.5 px-6 font-semibold">Rating</th>
            <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {products.map((product) => {
            const stockStatus =
              product.stock === 0
                ? 'Out of Stock'
                : product.stock < 10
                ? 'Low Stock'
                : 'In Stock';

            return (
              <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                {/* Product Name & Thumbnail */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail || 'https://via.placeholder.com/60'}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200/70 p-1 shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="min-w-0 max-w-xs">
                      <p className="font-semibold text-slate-900 truncate text-sm" title={product.title}>
                        {product.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {product.brand || 'StorePulse Brand'} • SKU-{product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-6">
                  <span className="inline-block capitalize text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-3.5 px-6">
                  <div className="font-semibold text-slate-900">
                    {formatCurrency(product.price)}
                  </div>
                  {product.discountPercentage > 0 && (
                    <span className="text-[11px] text-emerald-600 font-medium">
                      {product.discountPercentage}% off
                    </span>
                  )}
                </td>

                {/* Stock & Status */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(stockStatus)} dot size="xs">
                      {stockStatus}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">({product.stock})</span>
                  </div>
                </td>

                {/* Rating */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{product.rating ? Number(product.rating).toFixed(1) : '—'}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-6 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
