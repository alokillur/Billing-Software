import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ManageCategory from './pages/manageCategory/ManageCategory';
import ManageUsers from './pages/manageUsers/ManageUsers';
import ManageItems from './pages/manageItems/ManageItems';
import Explore from './pages/explore/Explore';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category' element={<ManageCategory />} />
        <Route path='/users' element={<ManageUsers />} />
        <Route path='/items' element={<ManageItems />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </>
  );
}
