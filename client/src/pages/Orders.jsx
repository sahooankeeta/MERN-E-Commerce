import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader,Empty } from '../components'
import { useDispatch,useSelector } from 'react-redux'
import { getAllOrders } from '../actions/order'
import Moment from 'react-moment';
const cols=[
    {
      label:"Date",
      value:"createdAt",
      sort:false
    },
    {
      label:"Items",
      value:"items",
      sort:false
    },
    {
      label:"Bill",
      value:"bill",
      sort:false
    },
    
  ]
const Orders = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading}=useSelector(state=>state.main)
    
    const {allOrders}=useSelector(state=>state.order)
   useEffect(()=>{
    dispatch(getAllOrders())
   },[dispatch])
   if(loading)
    <Loader/>
  return (
    <div className=' w-3/4 mx-auto mt-10'>
        <div className='text-2xl capitalize font-bold '>orders</div>
        {loading?<Loader/>:(
          (allOrders?.length>0) ?<table className=" mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              </tr>
          </thead>
          <tbody>
          {allOrders.map((item,index)=>
              <tr onClick={()=>navigate(`/orders/${item._id}`)} key={`item-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Moment format="DD/MM/YYYY , HH:MM:SS">{item.createdAt.toString()}</Moment>
                  </th>
                  <td className="px-6 py-4 truncate">
                      {item.itemCount }
                  </td>
                  <td className="px-6 py-4 ">
                      {item.bill}
                  </td>
                  
              </tr>
             )}
          </tbody>
          </table>:<Empty/>
        )}
        
        
    </div>
  )
}

export default Orders