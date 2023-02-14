import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import './App.css';
import Register from './components/auth/Register';
import Dashboard from './components/home/Dashboard';
import Home from './components/home/Home';
// import Footer from './components/nav/Footer';
import Nav from './components/nav/Nav';
import Orders from './components/admin/Orders';
import MealList from './components/admin/MealList';
import Admin from './components/admin/Admin';
import Snacks from './components/snacks/Snacks';
import CartList from './components/checkout/CartList';
import SingleSnack from './components/snacks/SingleSnack';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserAdmin } from './features/users/userSlice';
import Confrim from './components/orders/Confirm';
import OrderHistory from './components/orders/OrderHistory';
import EditOrder from './components/orders/EditOrder';
import ImageUploadForm from './components/Avatar';
import ErrorPage from './404';

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    const admin_id = sessionStorage.getItem('admin_id');
    
    dispatch(getUser(user_id));
    dispatch(getUserAdmin(admin_id))
  }, [])

  let loginRoutes = (
    <Routes>
      <Route exact path="/" element={<Snacks />} />
      <Route exact path="/snacks" element={<Snacks />} />
      <Route exact path="/snacks/:id/:name" element={<SingleSnack />} />
      <Route exact path="/orders/confirm" element={<Confrim />} />
      <Route exact path="/login" element={<Home />} />
      <Route exact path="/admin/login" element={<AdminLogin />} />
      <Route exact path="/avatar" element={<ImageUploadForm />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/cart" element={<CartList />} />
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
  )

  let routes = (
    <>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/snacks" element={<Snacks />} />
          <Route exact path="/cart" element={<CartList />} />
          <Route exact path="/orders/confirm" element={<Confrim />} />
          <Route exact path="/orders/history" element={<OrderHistory />} />
          <Route exact path="/orders/:id/edit" element={<EditOrder />} />
          <Route exact path="/snacks/:id/:name" element={<SingleSnack />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/orders" element={<Orders />} />
          <Route exact path="/admin/menu" element={<MealList />} />
          <Route exact path="/" element={<Snacks />} />
          <Route path='*' element={<ErrorPage />}/>
          <Route path='/login' element={<Navigate to="/" />}/>
          <Route path='/register' element={<Navigate to="/" />}/>
         
          {
            user.user.is_admin ?
            <Route path="*" element={<Navigate to="/admin" />} />
            :
            <Route path="*" element={<Navigate to="/dashboard" />} />
          }
        </Routes>
    </>
  )

  return (
    <>
    <Nav />
    {
        user.isLoggedIn ? 
        routes
        :
        loginRoutes
      }

    </>
  );
}

export default App;
