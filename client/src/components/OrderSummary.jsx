import React from 'react'
import {ProductBar} from "../components"
import Moment from 'react-moment';
const OrderSummary = ({order}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className="font-semi bold capitalize text-2xl mb-4">
          Order #{order._id}<br/>
          <Moment format="DD/MM/YYYY , HH:MM:SS">{order.createdAt.toString()}</Moment>
        </div>
      <div className='font-semibold text-xl capitalize mb-4'>Address</div>
        {Object.keys(order.address).map((key)=><div className='grid grid-cols-2'>
          <div className='font-bold capitalize'>{key}</div>
          <div>{order.address[key]}</div>
        </div>)}
      </div>
       <div> <div className='font-semibold text-xl capitalize mb-4'>order</div>
        {order.items.map(item=><ProductBar item={item} editable={false}/>)}</div>
       
    </div>
  )
}

export default OrderSummary