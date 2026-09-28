// REST API Client interacting with DummyJSON

const BASE_URL = 'https://dummyjson.com';

export const api = {
  // Fetch all products (with pagination support)
  getProducts: async ({ limit = 100, skip = 0 } = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch products from DummyJSON:', error);
      throw error;
    }
  },

  // Fetch product categories
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      // DummyJSON may return array of objects [{slug, name, url}] or array of strings
      return data.map((item) => (typeof item === 'object' && item !== null ? item.slug || item.name : item));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Fallback categories if network issue occurs
      return ['beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration', 'laptops', 'smartphones', 'skincare'];
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to search products:', error);
      throw error;
    }
  },

  // Add a product (sends request to DummyJSON simulation endpoint)
  addProduct: async (productData) => {
    try {
      const response = await fetch(`${BASE_URL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product via API');
      }
      const created = await response.json();
      return created;
    } catch (error) {
      console.warn('API add product simulated fallback:', error);
      // Generate realistic fallback object if offline or rate-limited
      return {
        ...productData,
        id: Date.now(),
        rating: 4.8,
      };
    }
  },

  // Update a product
  updateProduct: async (id, updatedFields) => {
    try {
      // DummyJSON supports ids 1 to 194. For locally created ones, skip network call
      if (typeof id === 'number' && id <= 200) {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFields),
        });
        if (response.ok) {
          return await response.json();
        }
      }
      return { id, ...updatedFields };
    } catch (error) {
      console.warn('API update product simulated fallback:', error);
      return { id, ...updatedFields };
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      if (typeof id === 'number' && id <= 200) {
        await fetch(`${BASE_URL}/products/${id}`, {
          method: 'DELETE',
        });
      }
      return true;
    } catch (error) {
      console.warn('API delete product fallback:', error);
      return true;
    }
  },
};
