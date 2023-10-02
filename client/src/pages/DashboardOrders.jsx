import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllOrders } from '../actions/order'
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
const DashboardOrders = () => {
  const dispatch=useDispatch()
  const {loading}=useSelector(state=>state.main)
    console.log(loading)
    const {allOrders}=useSelector(state=>state.order)
  useEffect(()=>{
    dispatch(getAllOrders())
  },[dispatch])
  return (
    <div>DashboardOrders</div>
  )
}

export default DashboardOrders