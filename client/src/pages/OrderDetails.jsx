import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Loader,OrderSummary} from "../components"
import {useParams,useNavigate} from 'react-router-dom'
import { getOrder } from '../actions/order'
const OrderDetails = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading}=useSelector(state=>state.main)
    const {order}=useSelector(state=>state.order)
    console.log(loading,order)
    useEffect(()=>{
     if(id){
        dispatch(getOrder(id))
     }
    },[dispatch,id])
    if(loading)
    return <Loader/>
    if(order)
  return (
    <div className='w-full px-6 md:px-2 md:w-3/4 mx-auto flex flex-col gap-2 mt-4'>
        <div className='flex justify-between'>
        <div className='text-2xl capitalize font-bold '>order details</div>
        <button onClick={()=>navigate(-1)} className="bg-slate-800 rounded-lg py-2 px-4 capitalize  text-white">back</button>
        </div>
        <OrderSummary order={order}/>
        
    </div>
  )
}

export default OrderDetails