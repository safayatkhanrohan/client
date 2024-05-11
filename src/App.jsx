import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

import './App.css'
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from './components/Home'
import ProductDetails from './features/products/ProductDetails'
import LoginUser from './features/users/LoginUser'
import RegisterUser from './features/users/RegisterUser'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/users/userSlice'
import { useEffect, useState } from 'react'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './features/users/updateProfile'
import UpdatePassword from './features/users/UpdatePassword'
import ForgotPassword from './features/users/ForgotPassword'
import NewPassword from './features/users/NewPassword'
import CartView from './features/cart/CartView'
import ShipingInfo from './features/cart/ShipingInfo'
import ConfirmOrder from './features/cart/ConfirmOrder'
import Payment from './features/cart/Payment'
import OrderSuccess from './components/OrderSuccess'
import ListOrder from './features/order/ListOrder'
import OrderDetailsView from './features/orderDetails/OrderDetailsView'
import Dashboard from './components/admin/Dashboard'
import AdminRoute from './components/route/AdminRoute'
import ProductList from './components/admin/ProductList'
import AllUserList from './features/allUser/AllUserView'
import UpdateUser from './components/admin/UpdateUser'
import NewProductView from './features/newProduct/NewProductView'
import UpdateProductView from './features/products/UpdateProductView'
import AllOrderView from './features/order/AllOrdersView'
import ProcessOrder from './features/order/ProcessOrder'
import ProductReview from './features/reviews/ProductReview'

axios.defaults.baseURL = 'http://localhost:9000/api/v1'
axios.defaults.withCredentials = true;

function App() {

  const user = useSelector(state => state.user);
  const {isUpdated, isAuthenticated} = user;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser());
  }, [isUpdated, isAuthenticated]);


  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/me/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/shiping" element={<ProtectedRoute><ShipingInfo /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/orders/me" element={<ProtectedRoute><ListOrder /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetailsView /></ProtectedRoute>} />
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AllUserList /></AdminRoute>} />
          <Route path="/admin/user/:id" element={<AdminRoute><UpdateUser /></AdminRoute>} />
          <Route path="/admin/product/new" element={<AdminRoute><NewProductView /></AdminRoute>} />
          <Route path="/admin/product/:id" element={<AdminRoute><UpdateProductView /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AllOrderView /></AdminRoute>} />
          <Route path="/admin/order/:id" element={<AdminRoute><ProcessOrder /></AdminRoute>} />
          <Route path="/admin/reviews" element={<AdminRoute><ProductReview /></AdminRoute>} />

        </Routes>
        <Toaster position='bottom-center' toastOptions={{ duration: 3000 }} />
      
      <Footer />
    </>
  )
}

export default App
