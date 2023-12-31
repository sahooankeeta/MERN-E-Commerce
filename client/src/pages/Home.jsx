import React, { useState,useEffect } from 'react'
import { Header,Sidebar } from '../components'
import { Routes,Route, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getCart} from "../actions/cart"
const Home = () => {
  const dispatch=useDispatch()
   const {cart}=useSelector(state=>state.cart) 
   const {authData:user}=useSelector(state=>state.auth)
    useEffect(()=>{
      if(user?.userType=='buyer')
      dispatch(getCart())
    },[])
  return (
    <div>
        <Header cartCount={cart?.items?.length}/>
      <div className={`relative bg-main-bg min-h-screen w-full`}>
        <Outlet/>
    </div>
    </div>
  )
}

export default Home