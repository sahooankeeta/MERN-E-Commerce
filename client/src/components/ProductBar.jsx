import React from 'react'
import { useDispatch } from 'react-redux'
import {RiArrowGoBackFill} from 'react-icons/ri'
import {ImBin2} from 'react-icons/im'
import {removeFromCart,updateCart } from '../actions/cart'
const ProductBar = ({item,editable,dispatch}) => {
  
  const handleRemove=(id)=>{
    dispatch(removeFromCart(id))
  }
  const handleUpdate=(data)=>{
    dispatch(updateCart(data))
  }
  const increment=()=>{
    handleUpdate({cartItemId:item._id,quantity:item.quantity+1})
  }
  const decrement=()=>{
    handleUpdate({cartItemId:item._id,quantity:item.quantity-1})
  }
  return (
    <div className='p-4 flex h-[200px] gap-4 border border-gray-300 rounded-md mb-4'>
    <div className='w-[150px] h-full'><img className='w-full h-full' src={editable?item?.product?.images[0]?.imgUrl:item.product_image} alt="" /></div>
    <div className="flex flex-col justify-around">
        <div className='flex flex-col gap-1'>
        <div>{editable? item?.product?.user?.company:item.company_name}</div>
        <div>{editable? item?.product?.name:item.product_name}</div>
        <div>Rs. {(editable? item?.product?.price:item.product_price)*item?.quantity}</div>
        </div>
        {editable ? <>
          <div className='flex gap-2 '>
            <button disabled={item.quantity<=1} onClick={decrement} className='h-6 w-6 rounded-md font-semibold bg-cyan-600 disabled:bg-cyan-900 text-white'>-</button>
            <span>{item.quantity}</span>
            <button disabled={item.quantity>=item.product.stock} onClick={increment} className='h-6 w-6 rounded-md font-semibold bg-cyan-600 disabled:bg-cyan-900 text-white'>+</button>
        </div>
        <div className="flex gap-3">
            
            <button onClick={()=>handleRemove(item._id)} className="rounded-md bg-red-500 text-white flex items-center justify-center gap-2 capitalize px-2 py-1">
                <ImBin2/>
                <span>Remove</span>
            </button>
        </div></>:<div>Quantity : {item?.quantity}</div>}
        
    </div>
    </div>
  )
}

export default ProductBar