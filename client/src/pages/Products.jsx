import React,{useState,useEffect} from 'react'
import data from "../data.json"
import { Pagination,ProductList,Sidebar,Sort,Filter } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/product'
const Products = () => {
 
  
  const [viewMenu,setViewMenu]=useState(true)
 
  return (
    <div className='flex'>
       {viewMenu?
    <div className='w-72 fixed sidebar  bg-gray-50 h-full'>
      <Filter/>
    </div>:
    <div className='w-0 '>
      <Filter/>
      </div>}
      <div className={`relative px-10 dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${viewMenu?'md:ml-72':'flex-2'}`}>
      <div className="w-full flex justify-end my-6">
      <div className="relative inline-block text-left">
      </div>
      </div>
     
        <ProductList/>
     
      
    </div>
    </div>
    
  )
}

export default Products