import React,{useState,useEffect} from 'react'
import ProductCard from './ProductCard'
import Empty from './Empty'
import Pagination from './Pagination'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/product'
import { useSearchParams } from 'react-router-dom'
const ProductList = () => {
  const dispatch=useDispatch()
  const [searchParams,setSearchParams] = useSearchParams()

  let page=1
  if(searchParams.get("page"))
   page=searchParams.get("page")
  //const [page,setPage]=useState(1)
  const {filter}=useSelector(state=>state.filter)
  const {allProducts,totalPages,loading}=useSelector(state=>state.product)
  useEffect(()=>{
    dispatch(getProducts({page,filter}))
   },[dispatch,page])
   if(loading)
    return <Loader/>
   if(!loading && allProducts)
  return (
   <div>
    
    {allProducts?.length>0 ?
    <>
    <div className="flex flex-wrap gap-8">
      {allProducts.map((item,index)=><ProductCard key={`prod-${item._id}`} item={item}/>)}
      </div>
      <Pagination currentPage={page-1} pageCount={totalPages} />
      </>:
       <Empty/>}
   </div>
  )
}

export default ProductList