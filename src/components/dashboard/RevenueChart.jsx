import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { REVENUE_7DAYS, REVENUE_30DAYS, REVENUE_TIMELINE } from '../../utils/mockData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs space-y-1">
        <p className="font-semibold text-slate-300">{label}</p>
        <p className="text-emerald-400 font-bold text-sm">
          Revenue: {formatCurrency(payload[0].value)}
        </p>
        {payload[0].payload.orders && (
          <p className="text-slate-300">
            Orders: <span className="font-semibold text-white">{formatNumber(payload[0].payload.orders)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const RevenueChart = () => {
  const [period, setPeriod] = useState('12M');

  let data = REVENUE_TIMELINE;
  let xKey = 'month';

  if (period === '7D') {
    data = REVENUE_7DAYS;
    xKey = 'day';
  } else if (period === '30D') {
    data = REVENUE_30DAYS;
    xKey = 'date';
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Revenue Analytics</h3>
          <p className="text-xs text-slate-500 mt-0.5">Overview of gross sales over selected time window</p>
        </div>

        {/* Time Period Filter */}
        <div className="inline-flex rounded-lg p-1 bg-slate-100 self-start sm:self-auto">
          {[
            { id: '7D', label: '7 Days' },
            { id: '30D', label: '30 Days' },
            { id: '12M', label: '12 Months' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                period === item.id
                  ? 'bg-white text-indigo-600 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
