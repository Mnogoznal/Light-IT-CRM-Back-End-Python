import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import CreateOrderPage from './pages/CreateOrderPage';
import OrderReceipt from './pages/OrderReceipt';
import EditOrderPage from './pages/EditOrderPage';
import ClientOrdersPage from './pages/ClientOrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateClientOrderPage from './pages/CreateClientOrderPage';
import CurrentYear from './pages/CurrentYear';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/create-order" element={<CreateOrderPage />} />
          <Route path="/order-receipt/:id" element={<OrderReceipt />} />
          <Route path="/edit-order/:id" element={<EditOrderPage />} />
          <Route path="/clients-order" element={<ClientOrdersPage />} />
          <Route path="/create-client-order" element={<CreateClientOrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Другие маршруты */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;