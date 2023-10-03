import React from 'react'
import {AiFillHeart} from 'react-icons/ai'
import { Link } from 'react-router-dom'
const ProductCard = ({item}) => {
  return (
<div className="w-[260px] relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
{/* <button className="absolute right-5 top-5">
            <AiFillHeart fill='red'/>//VITE_API_URL=https://mern-e-commerce-3hjb.vercel.app/
        </button> */}
        <Link to={`/products/${item._id}`}>
        <div className='h-[250px]'>
        <img 
        className="rounded-t-lg w-full h-full object-cover" 
        src={item.images[0]?.imgUrl} alt="" />
    </div>
    <div className="p-5 flex flex-col">
    <p className=" font-normal text-gray-700 dark:text-gray-400 truncate">{item.user.company}</p>
        <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{item.name}</h5>
        
        <p className=" font-normal text-gray-700 dark:text-gray-400">{item.price}</p>
        
    </div>
        </Link>
    
</div>

  )
}

export default ProductCard