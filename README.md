# StorePulse — Realistic E-Commerce Admin Dashboard

A professional, high-performance E-Commerce Admin Dashboard built with **React.js**, **JavaScript**, **Tailwind CSS**, **React Router DOM v6**, **Recharts**, and the **DummyJSON REST API**.

Designed specifically as an authentic, real-world SaaS portfolio project for e-commerce store operations, inventory management, order processing, and revenue analytics.

![StorePulse Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Features

### 1. 🔐 Authentication & Session Guard
- **Split-card SaaS Login View**: Email and password validation.
- **Show/Hide Password**: Smooth password reveal toggle.
- **1-Click Demo Login**: Pre-populated credentials (`admin@storepulse.io` / `admin123`) for instant evaluation.
- **Protected Routes**: Navigation guards redirect unauthenticated users to `/login` and redirect logged-in users directly to `/`.

### 2. 📊 Executive Dashboard Overview (`/`)
- **Key Metrics**: Total Revenue, Total Orders, Total Products, and Total Customers with percentage month-over-month trend indicators.
- **Interactive Revenue Chart**: Area chart with smooth gradient fill and selectable 7-day, 30-day, and 12-month filters.
- **Order Volume Chart**: Monthly processed orders breakdown with hover tooltips.
- **Recent Orders Table**: Quick transaction status badges, customer avatars, and instant detail view.
- **Top-Selling Products**: Ranking of highest volume catalog items with ratings and revenue.

### 3. 📦 Products Management & Catalog (`/products`)
- **Dual View Modes**: Switch between **Dense Table View** and **Card Grid View**.
- **Real-Time Search**: Search by product title, brand, SKU, or category.
- **Multi-Level Filters**:
  - Filter by Category (dynamically fetched from DummyJSON).
  - Filter by Stock Status (*In Stock*, *Low Stock*, *Out of Stock*).
  - Sort by Price (Low to High, High to Low), Rating, or Inventory level.
- **Pagination**: Customizable results per page (8, 10, 20, 50).
- **CRUD Operations**:
  - Add new products with live image URL preview and validation.
  - Edit existing product specifications, pricing, and stock.
  - Delete items with a danger confirmation modal.
  - Simulated REST API persistence powered by `localStorage`.

### 4. 🛒 Orders Management (`/orders`)
- **Fulfillment Pipeline**: Status tabs (*All*, *Delivered*, *Processing*, *Shipped*, *Pending*, *Cancelled*) with live item count badges.
- **Payment Status Filter**: Filter by *Paid*, *Pending*, and *Failed*.
- **Comprehensive Order Modal**: Full line-item breakdown with product images, customer shipping address, payment method, tax calculations, and a direct status updater.

### 5. 👥 Customers Directory (`/customers`)
- **Customer Profiles**: Avatars, contact email, phone, address, total orders, and lifetime value ($).
- **Account Tier Filters**: *Active*, *VIP*, and *Inactive*.
- **Customer Drawer Modal**: Detailed customer history, spending breakdown, and status toggle.

### 6. 📈 Advanced Analytics & Insights (`/analytics`)
- **KPI Metrics**: Average Order Value (AOV), Conversion Rate, Repeat Purchase Rate, and Gross Margin.
- **Multi-Area Revenue vs. Expenses Chart**: Comparison of operating fulfillment expenses against gross revenue.
- **Orders by Month Bar Chart**: Volume growth metrics.
- **Category Sales Donut Chart**: Breakdown of revenue share per product vertical.
- **Customer Acquisition Line Chart**: Cumulative customer base vs new monthly acquisitions.

### 7. ⚙️ Store Settings & Reset (`/settings`)
- Configure Store Name, Support Email, Currency ($ USD, € EUR, £ GBP), and Timezones.
- Notification toggles for order alerts and low stock alerts.
- **Reset Demo Data Button**: Instantly restores catalog, orders, and customer records back to clean initial demo state.

### 8. 📱 Responsive Navigation & SaaS Polish
- **Collapsible Sidebar**: Desktop compact/expanded toggle with active link highlight.
- **Mobile Slide-Over Drawer**: Smooth mobile navigation with backdrop blur.
- **Global Header**: Search input with keyboard shortcut hint (`↵`), notification bell with unread indicator and popover, user profile menu, and sign-out action.
- **Floating Toast System**: Live success/error/warning/info alerts.
- **Skeleton Loaders & Empty States**: Polished loading and fallback states.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Public REST API** | [DummyJSON Products API](https://dummyjson.com/docs/products) |
| **State Persistence** | `localStorage` API Cache Layer |

---

## 📂 Project Structure

```
ecommerce-admin-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                   # Router, ProtectedRoute guards, Context providers
    ├── main.jsx                  # Application entry point
    ├── index.css                 # Tailwind v4 import & custom styles
    ├── components/
    │   ├── common/               # Reusable UI primitives
    │   │   ├── Button.jsx        # Button with variants, sizes, and spinner
    │   │   ├── Card.jsx          # Panel card with title and action slots
    │   │   ├── Badge.jsx         # Status badge with color mappings
    │   │   ├── Modal.jsx         # Accessible modal dialog with backdrop
    │   │   ├── Toast.jsx         # Floating stacked notifications
    │   │   ├── Skeleton.jsx      # Skeleton loaders for table rows & cards
    │   │   ├── EmptyState.jsx    # Placeholder for empty searches/lists
    │   │   ├── Pagination.jsx    # Page numbers, jump controls, per-page select
    │   │   └── SearchInput.jsx   # Search input with icon and clear button
    │   ├── dashboard/
    │   │   ├── StatCard.jsx          # Metric cards with percentage trends
    │   │   ├── RevenueChart.jsx      # Area chart with 7D/30D/12M switcher
    │   │   ├── OrdersChart.jsx       # Monthly volume bar chart
    │   │   ├── RecentOrdersTable.jsx # Recent transactions table
    │   │   └── TopProductsList.jsx   # Top 5 bestselling products
    │   ├── products/
    │   │   ├── ProductTable.jsx      # Dense catalog table with actions
    │   │   ├── ProductGrid.jsx       # Responsive card grid view
    │   │   ├── ProductFormModal.jsx  # Add/Edit product modal with image preview
    │   │   └── DeleteConfirmModal.jsx# Delete confirmation alert
    │   ├── orders/
    │   │   ├── OrderStatusBadge.jsx  # Colored order & payment status tags
    │   │   └── OrderDetailsModal.jsx # Full order breakdown & status changer
    │   └── customers/
    │       └── CustomerDetailsModal.jsx # Customer profile & lifetime spend
    ├── layouts/
    │   ├── DashboardLayout.jsx   # Shell with sidebar, header, and outlet
    │   ├── Sidebar.jsx           # Collapsible navigation sidebar
    │   └── Header.jsx            # Top bar with search, notifications, profile
    ├── pages/
    │   ├── LoginPage.jsx         # SaaS login screen with demo button
    │   ├── DashboardPage.jsx     # Overview page with KPI cards and charts
    │   ├── ProductsPage.jsx      # Full products catalog management
    │   ├── OrdersPage.jsx        # Orders tracking and fulfillment
    │   ├── CustomersPage.jsx     # Customer accounts directory
    │   ├── AnalyticsPage.jsx     # 4 Recharts visualizations & insights
    │   ├── SettingsPage.jsx      # Store configuration & reset data
    │   └── NotFoundPage.jsx      # Friendly 404 page
    ├── context/
    │   ├── AuthContext.jsx       # Authentication state & demo session
    │   ├── ToastContext.jsx      # Global toast notification dispatch
    │   ├── ProductContext.jsx    # Product CRUD, category fetch, and stats
    │   ├── OrderContext.jsx      # Orders state and status updates
    │   └── CustomerContext.jsx   # Customer records management
    ├── services/
    │   ├── api.js                # REST API client for DummyJSON
    │   └── storage.js            # LocalStorage persistence manager
    └── utils/
        ├── formatters.js         # Currency, date, and status formatters
        └── mockData.js           # Realistic orders, customers, and analytics
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### 1. Installation
Clone or navigate to the project directory and install dependencies:
```bash
cd ecommerce-admin-dashboard
npm install
```

### 2. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local URL (typically `http://localhost:5173`).

### 3. Build for Production
To generate an optimized production build:
```bash
npm run build
```
You can preview the production bundle locally with:
```bash
npm run preview
```

---

## 🔑 Demo Login Credentials

For quick evaluation, click the **"One-Click Demo Admin Login"** button on the Login page, or enter:

- **Email**: `admin@storepulse.io`
- **Password**: `admin123`

---

## 🌐 REST API & Persistence Architecture

1. **Remote Fetching**: The application fetches live catalog items and categories from `https://dummyjson.com/products`.
2. **Offline-Resilient Persistence**: Because public APIs do not permanently write changes to their database, StorePulse uses a layered storage strategy:
   - On the initial run, live items are retrieved from DummyJSON and synchronized into browser storage.
   - Any added, edited, or deleted products and order status modifications are persisted in `localStorage`.
   - If you reload the page, all your custom changes remain intact!
   - Need to start fresh? Go to **Settings** and click **"Reset All Demo Data"** to restore original live data.

---

## 📄 License
This project is open-source and available under the MIT License.
