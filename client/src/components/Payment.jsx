import React,{useState} from 'react'
import data from "../data.json"
import { useSelector,useDispatch } from 'react-redux'
import { BiLogoLess } from 'react-icons/bi'
import { createOrder,verifyOrder } from '../actions/order'
const Payment = ({nextStep,prevStep,bill,setBill}) => {
  const dispatch=useDispatch()
  const [inProgress,setInProgess]=useState(false)
  const {cart}=useSelector(state => state.cart)
  
  const {authData:user}=useSelector(state => state.auth)
  const loadScript=(src)=>{
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const displayRazorpay=async()=>{
  setInProgess(true)
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    dispatch(createOrder({orderData:{amount:cart.bill*100},setBill,bill,setInProgess,nextStep,user}));
    

   
}
  return (
    <div className='w-2/3 mx-auto my-8 flex flex-col gap-3'>
      <div>
        <h2 className='font-bold text-slate-700 text-lg mb-3'>Order summary</h2>
        {cart?.items?.map((item,index)=>
        <div key={`cart-${index}`} className='flex justify-between gap-2 items-end mb-3'>
          <div>
            <div>{item?.user?.company}</div>
            <div>{item?.product?.name}</div>
            <div className='font-semibold text-slate-800'>quantity : {item?.quantity}</div>
          </div>
          <div className='font-semibold text-slate-800'>{item?.quantity*item?.product?.price}</div>
        </div>)}
      </div>
      <hr/>
       <div className="flex gap-3">
        <button disabled={inProgress} onClick={()=>prevStep()} className="rounded-lg flex-1 bg-slate-800 disabled:bg-slate-600 text-white capitalize py-2 px-2 cursor-pointer text-center">back</button>
        <button  onClick={displayRazorpay} className="rounded-lg flex-1 bg-cyan-600  disabled:bg-slate-600 text-white capitalize py-2 px-2 cursor-pointer text-center">pay {cart.bill}</button>
       </div>
    </div>
  )
}

export default Payment