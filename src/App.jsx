import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import CustomerDetail from './pages/CustomerDetail';
import AddCustomer from './pages/AddCustomer';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import Pesanan from './pages/Pesanan';

// Placeholder components for other routes
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/add" element={<AddCustomer />} />
          <Route path="customer/:id" element={<CustomerDetail />} />
          <Route path="customer/:id/edit" element={<PlaceholderPage title="Edit Customer" />} />
          <Route path="product" element={<Product title="Product Management" />} />
          <Route path="product/add" element={<AddProduct title="Add Product" />} />
          <Route path="stock" element={<PlaceholderPage title="Stock Management" />} />
          <Route path="restaurant" element={<PlaceholderPage title="Restaurant" />} />
          <Route path="pesanan" element={<Pesanan title="pesanan" />} />
          <Route path="report" element={<PlaceholderPage title="Reports" />} />
          <Route path="role-admin" element={<PlaceholderPage title="Role & Admin" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="stock-integration" element={<PlaceholderPage title="Stock Integration" />} />
          <Route path="supply-integration" element={<PlaceholderPage title="Supply Integration" />} />
        </Route>
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;