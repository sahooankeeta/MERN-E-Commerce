import React, { useState,useEffect } from 'react'
import { Navbar,Sidebar } from '../components'
import { Routes,Route, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getCart} from "../actions/cart"
const Home = () => {
  const dispatch=useDispatch()
   const {cart}=useSelector(state=>state.cart) 
    useEffect(()=>{
      console.log("home")
      dispatch(getCart())
    },[])
  return (
    <div>
        <Navbar cartCount={cart?.items?.length}/>
      <div className={`relative bg-main-bg min-h-screen w-full`}>
        <Outlet/>
    </div>
    </div>
  )
}

export default Home