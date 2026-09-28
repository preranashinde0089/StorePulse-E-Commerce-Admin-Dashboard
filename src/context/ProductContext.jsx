import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  // Load products and categories on mount
  const loadData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      // Check local storage first unless force refresh requested
      const cachedProducts = !forceRefresh ? storage.getProducts() : null;

      const [productsData, categoriesData] = await Promise.all([
        cachedProducts
          ? Promise.resolve({ products: cachedProducts })
          : api.getProducts({ limit: 50 }),
        api.getCategories(),
      ]);

      const loadedProducts = cachedProducts || productsData.products || [];
      // Normalize product fields
      const normalizedProducts = loadedProducts.map((p) => ({
        ...p,
        status: p.status || (p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'In Stock'),
        salesCount: p.salesCount || Math.floor(Math.random() * 850) + 50,
      }));

      setProducts(normalizedProducts);
      storage.setProducts(normalizedProducts);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Failed to load products data:', err);
      setError('Failed to fetch product catalog. Using offline cache if available.');
      showToast('Could not reach remote API. Working in offline mode.', 'warning');
      const fallback = storage.getProducts() || [];
      setProducts(fallback);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add Product
  const addProduct = async (productData) => {
    try {
      const created = await api.addProduct(productData);
      const newProduct = {
        ...productData,
        id: created.id || Date.now(),
        thumbnail: productData.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
        rating: 5.0,
        status: Number(productData.stock) === 0 ? 'Out of Stock' : Number(productData.stock) < 10 ? 'Low Stock' : 'In Stock',
        salesCount: 0,
      };

      const updated = [newProduct, ...products];
      setProducts(updated);
      storage.setProducts(updated);
      showToast(`Product "${productData.title}" created successfully!`, 'success');
      return newProduct;
    } catch (err) {
      console.error('Failed to add product:', err);
      showToast('Error creating product. Please try again.', 'error');
      throw err;
    }
  };

  // Update Product
  const updateProduct = async (id, updatedFields) => {
    try {
      await api.updateProduct(id, updatedFields);
      const updated = products.map((item) => {
        if (item.id === id) {
          const merged = { ...item, ...updatedFields };
          merged.status = Number(merged.stock) === 0 ? 'Out of Stock' : Number(merged.stock) < 10 ? 'Low Stock' : 'In Stock';
          return merged;
        }
        return item;
      });

      setProducts(updated);
      storage.setProducts(updated);
      showToast('Product updated successfully!', 'success');
      return true;
    } catch (err) {
      console.error('Failed to update product:', err);
      showToast('Error updating product.', 'error');
      throw err;
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      const updated = products.filter((item) => item.id !== id);
      setProducts(updated);
      storage.setProducts(updated);
      showToast('Product deleted successfully.', 'info');
      return true;
    } catch (err) {
      console.error('Failed to delete product:', err);
      showToast('Error deleting product.', 'error');
      throw err;
    }
  };

  // Reset to original live API products
  const resetProducts = async () => {
    localStorage.removeItem('storepulse_products');
    await loadData(true);
    showToast('Product catalog reset to original API data.', 'info');
  };

  // Derived metrics
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.stock > 10).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0);

    return {
      total,
      inStock,
      lowStock,
      outOfStock,
      totalInventoryValue,
    };
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        stats,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        refreshProducts: loadData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
