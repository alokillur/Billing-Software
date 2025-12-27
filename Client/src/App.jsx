import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ManageCategory from './pages/manageCategory/ManageCategory';
import ManageUsers from './pages/manageUsers/ManageUsers';
import ManageItems from './pages/manageItems/ManageItems';
import Explore from './pages/explore/Explore';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/Login';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginRoute from './components/auth/LoginRoute';
import OrderHistory from './pages/orderHistory/OrderHistory';
import NotFound from './pages/notFound/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname !== '/login' && <Navbar />}
      <Toaster />
      <Routes>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/explore' element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        
        <Route path='/category' element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><ManageCategory /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><ManageUsers /></ProtectedRoute>} />
        <Route path='/items' element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><ManageItems /></ProtectedRoute>} />
        
        <Route path='/login' element={<LoginRoute><Login /></LoginRoute>} />
        <Route path='/orders' element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
