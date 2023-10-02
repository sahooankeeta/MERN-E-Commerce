import React from 'react'
import RangeFilter from './RangeFilter'
import { addFilter,clearFilter } from '../actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/product'
const Filter = () => {
  const {filter}=useSelector(state=>state.filter)
  const dispatch=useDispatch()
  const handleApplyFilter=()=>{
    dispatch(getProducts({filter}))
    //closeFilter()
   }
   const handleClearFilter=()=>{
     dispatch(clearFilter())
    // dispatch(getData({filter:{}}))
    // closeFilter()
   }
  const handleAddFilter=(value)=>{
    //console.log(value)
    dispatch(addFilter(value))
 }
  return (
    <div className='px-4 py-2'>
      <div className='capitalize font-bold text-slate-800 text-2xl'>filter</div>
      <RangeFilter title="price" handleAddFilter={handleAddFilter}/>
      <div className='flex gap-2'>
          <button 
          onClick={handleClearFilter}
          className='outline-none bg-cyan-600 hover:bg-cyan-800 text-white font-semibold capitalize flex-1 rounded-lg p-2'>clear</button>
          <button 
          className='outline-none bg-cyan-600 hover:bg-cyan-800 text-white font-semibold capitalize flex-1 rounded-lg p-2'
          onClick={handleApplyFilter}
          >apply</button>
        </div>
    </div>
  )
}

export default Filter