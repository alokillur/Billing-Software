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

export default function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname !== '/login' && <Navbar />}
      <Toaster />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </>
  );
}
