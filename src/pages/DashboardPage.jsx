import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, Plus, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { OrdersChart } from '../components/dashboard/OrdersChart';
import { RecentOrdersTable } from '../components/dashboard/RecentOrdersTable';
import { TopProductsList } from '../components/dashboard/TopProductsList';
import { OrderDetailsModal } from '../components/orders/OrderDetailsModal';
import { ProductFormModal } from '../components/products/ProductFormModal';
import { Button } from '../components/common/Button';
import { MetricCardSkeleton } from '../components/common/Skeleton';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useCustomers } from '../context/CustomerContext';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { products, categories, loading: productsLoading, addProduct } = useProducts();
  const { orders, stats: orderStats, updateOrderStatus } = useOrders();
  const { stats: customerStats } = useCustomers();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  const handleAddProduct = async (productData) => {
    setIsSavingProduct(true);
    try {
      await addProduct(productData);
      setIsAddModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingProduct(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time business performance and sales metrics for StorePulse.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            icon={ArrowUpRight}
            iconPosition="right"
            onClick={() => navigate('/analytics')}
          >
            Detailed Analytics
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {productsLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(orderStats.totalRevenue + 84650)}
              change="+14.2%"
              trend="up"
              period="vs last month"
              icon={DollarSign}
              iconBg="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="Total Orders"
              value={formatNumber(orderStats.totalOrders + 1040)}
              change="+8.5%"
              trend="up"
              period="vs last month"
              icon={ShoppingBag}
              iconBg="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Total Products"
              value={formatNumber(products.length)}
              change={`${products.filter((p) => p.stock > 0).length} active`}
              trend="neutral"
              period="in catalog"
              icon={Package}
              iconBg="bg-amber-50 text-amber-600"
            />
            <StatCard
              title="Total Customers"
              value={formatNumber(customerStats.totalCustomers + 2780)}
              change="+12.4%"
              trend="up"
              period="vs last month"
              icon={Users}
              iconBg="bg-sky-50 text-sky-600"
            />
          </>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <OrdersChart />
        </div>
      </div>

      {/* Tables & Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable
            orders={orders}
            onViewOrder={(order) => setSelectedOrder(order)}
          />
        </div>
        <div className="lg:col-span-1">
          <TopProductsList products={products} />
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onStatusChange={(id, newStatus) => {
            updateOrderStatus(id, newStatus);
            setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
          }}
        />
      )}

      {/* Quick Add Product Modal */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
        categories={categories}
        loading={isSavingProduct}
      />
    </div>
  );
};
