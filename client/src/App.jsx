import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import {Auth,Home,Landing, ProductDetail,Products,Cart,Checkout,Dashboard, DashboardProducts, DashboardOrders,Orders,OrderDetails} from "./pages"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {setScreenSize,setViewMenu} from "./actions/main"
const App=()=>{
  const {authData:user}=useSelector(state=>state.auth)
  const {screenSize}=useSelector(state=>state.main)
  const dispatch=useDispatch()
  useEffect(()=>{
    const handleResize=()=>dispatch(setScreenSize(window.innerWidth))
    window.addEventListener("resize",handleResize)
    handleResize()
    return ()=>window.removeEventListener("resize",handleResize)
  },[])
  useEffect(()=>{
    if(screenSize<=900){
      dispatch(setViewMenu(false))
    }else{
      dispatch(setViewMenu(true))
    }
  },[screenSize])
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
