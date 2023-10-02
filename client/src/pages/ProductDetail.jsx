import React,{useEffect,useState} from 'react'

import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { getProduct } from '../actions/product';
import { addToCart,removeFromCart } from '../actions/cart';
const ProductDetail = () => {
  const {id}=useParams()
  const dispatch=useDispatch()
  const [inCart,setInCart]=useState()
  const {cart}=useSelector(state=>state.cart)
  useEffect(()=>{
    if(id)
    {
      dispatch(getProduct(id))
      setInCart(cart?.items?.find(item=>item?.product?._id==id))
      //console.log(cart)
    }
  },[dispatch,id,cart])
  //const {loading}=useSelector(state=>state.main)
  const {product,loading}=useSelector(state=>state.product)
  
  if(product && !loading)
  return (
    <div className='flex gap-10 px-10 mt-4 w-4/5 mx-auto'>
      <div className='w-[400px] rounded-lg'>
       <Carousel
       >
        {product?.images?.map((item,index)=>
        <div className='h-[500px]' key={`img-${index}`}>
          <img className='h-full object-cover' src={item?.imgUrl} at="pp"/>
          </div>)}
       </Carousel>
      </div>
      <div className='flex-1'>
         <h2>{product?.user?.company}</h2>
         <div>{product?.name}</div>
         <hr/>
         <h3>{product?.price}</h3>
         <div>{product?.description}</div>
         <div className="flex gap-2 mt-4">
          {inCart ?<button onClick={()=>dispatch(removeFromCart(inCart._id))} className="rounded-lg text-white bg-red-600 p-2 min-w-[150px] capitalize">remove from bag</button>:
          <button disabled={product.stock<=0} onClick={()=>dispatch(addToCart({"productId":product._id,"quantity":1}))} className="rounded-lg text-white bg-cyan-600 disabled:bg-cyan-900 p-2 min-w-[150px] capitalize">{product.stock>0?'add to bag':'out of stock'}</button>}
         </div>
      </div>
    </div>
  )
}

export default ProductDetail