import React,{useEffect} from 'react'
import {Loader,Empty} from "../components"
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {ProductBar} from '../components'
import { getCart} from '../actions/cart'
const Cart = () => {
  const dispatch=useDispatch()
  const {loading}=useSelector(state=>state.main)
  const {cart} =useSelector(state=>state.cart)
  const {authData:user}=useSelector(state=>state.auth)
  useEffect(()=>{
    if(user?.userType=='buyer')
    dispatch(getCart())
  },[dispatch])
  if(loading)
  return <Loader/>
  
  return (
    <div className='flex gap-10 w-full px-6 md:px-2 md:w-3/4 mx-auto mt-10'>
      {(!cart?.items || cart?.items?.length==0) ? <Empty/>:<>
        <div className="flex-1 flex flex-col gap-3">
          
            {cart?.items?.length>0 && cart?.items?.map((item,index)=><ProductBar editable={true} dispatch={dispatch} key={`cart-${index}`} item={item}/>)}
        </div>
        <div className='w-1/4'>
            <div className="flex justify-between font-semibold text-slate-600 mb-6">
                <span>Total Amount</span>
                <span>{cart?.bill}</span>
            </div>
            <Link to="/checkout" className="min-w-[250px] rounded-lg bg-cyan-500 text-white p-4 capitalize font-semibold">place order</Link>
        </div>
        </>}
    </div>
  )
}

export default Cart