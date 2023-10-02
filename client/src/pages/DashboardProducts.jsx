import React,{useState,useEffect} from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import {ProductForm} from "../components"
import { useDispatch, useSelector } from 'react-redux'
import {Loader,Empty,Pagination} from "../components"
import { getProducts,deleteProduct } from '../actions/product'
const cols=[
  {
    label:"Product Name",
    value:"name",
    sort:false
  },
  {
    label:"Description",
    value:"description",
    sort:false
  },
  {
    label:"Stock",
    value:"stock",
    sort:false
  },
  {
    label:"Price",
    value:"price",
    sort:false
  }
]

const DahboardProducts = () => {
  const dispatch=useDispatch()
  const [page,setPage]=useState(1)
  
  const [viewProductForm,setViewProductForm]=useState(false)
  const [editItem,setEditItem]=useState(null)
  useEffect(()=>{
   dispatch(getProducts({page,limit:50}))
  },[dispatch,page,])
  const {allProducts,loading,totalPages}=useSelector(state=>state.product)

  return (
    <div className='px-5 py-2'>
      {viewProductForm && <ProductForm setViewProductForm={setViewProductForm} item={editItem} setEditItem={setEditItem}/>}
      <button className="rounded-md text-white bg-cyan-600 py-2 px-4 capitalize" onClick={()=>{setViewProductForm(true);setEditItem(null)}}>+ add</button>
       {loading ? <Loader/>:allProducts.length>0 ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className=" mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white bg-slate-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {cols.map((col,index)=>
                <th key={`col-${index}`} scope="col" className="px-6 py-3">
                <div className="flex items-center">
                    {col.label}
                   {col.sort &&  <a href="#"><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
</svg></a>}
                </div>
            </th>)}
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
          {allProducts.map((item,index)=>
            <tr key={`item-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className='truncate max-w-[20vw]'>{item.name}</div>
                </th>
                <td className="px-6 py-4 ">
                    <div className='truncate max-w-[30vw]'>{item.description}</div>
                </td>
                <td className="px-6 py-4 ">
                    {item.stock}
                </td>
                <td className="px-6 py-4">
                    Rs. {item.price}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2 text-xl">
                    <button onClick={()=>{
                      setEditItem(item)
                      setViewProductForm(true)
                    }} className="text-cyan-700 rounded-md"><AiFillEdit/></button>
                    <button onClick={()=>dispatch(deleteProduct(item._id))} className="text-cyan-700 rounded-md"><AiFillDelete/></button>
                </td>
            </tr>
           )}
        </tbody>
    </table>
    <Pagination currentPage={page-1} pageCount={totalPages} setPage={setPage}/>
</div>:
<Empty/>} 

    </div>
  )
}

export default DahboardProducts