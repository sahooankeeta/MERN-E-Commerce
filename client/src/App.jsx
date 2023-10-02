import { useState } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import {Auth,Home,Landing, ProductDetail,Products,Cart,Checkout,Dashboard, DashboardProducts, DashboardOrders,Orders,OrderDetails} from "./pages"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
const App=()=>{
  const {authData:user}=useSelector(state=>state.auth)
  return (
    <BrowserRouter >
    <ToastContainer />
      <Routes>
        <Route path="/auth" element={user?<Navigate to="/"/>:<Auth/>}/>
        <Route path="/" element={user? <Home/>:<Navigate to="/auth"/>}>
        <Route path="products" element={<Products/>}/>
        <Route path="products/:id" element={<ProductDetail/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/orders/:id" element={<OrderDetails/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="orders" element={<Orders/>}/>
          <Route path="" element={<DashboardProducts/>}/>
        </Route>
        <Route path="" element={<Landing/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
