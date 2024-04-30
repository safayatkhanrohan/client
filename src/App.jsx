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

axios.defaults.baseURL = 'http://localhost:9000/api/v1'
axios.defaults.withCredentials = true;

function App() {

  const {user, isAuthenticated, isUpdated} = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    function loadStripe() {
      if (isAuthenticated) {
        axios.get('/stripeapi').then(res => setStripeApiKey(res.data.stripeApiKey));
      }
    }
    loadStripe();
  }, [isAuthenticated, isUpdated]);

  return (
    <>
      <Header />
        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/me/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route path="/password/forgot" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
          <Route path="/password/reset/:token" element={<ProtectedRoute><NewPassword /></ProtectedRoute>} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/shiping" element={<ProtectedRoute><ShipingInfo /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

        </Routes>
        
        <Toaster position='bottom-center' toastOptions={{ duration: 3000 }} />
      </div>
      <Footer />
    </>
  )
}

export default App
