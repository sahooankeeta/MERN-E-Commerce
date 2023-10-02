import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const OrderConfirmation = () => {
   
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-center font-bold mb-4'>Thank you for placing order</div>
      <Link to="/products" className='py-2 px-4 bg-cyan-600 text-white rounded-lg'>Continue shopping</Link>
    </div>
  )
}

export default OrderConfirmation