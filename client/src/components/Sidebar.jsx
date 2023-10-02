import React,{useState} from 'react'
import {Navbar,Filter} from '../components'
import { useSelector,useDispatch } from 'react-redux'
import {MdOutlineCancel} from 'react-icons/md'
import { setViewMenu } from '../actions/main'
const Sidebar = () => {
  const dispatch=useDispatch()
  const {authData:user}=useSelector(state=>state.auth)
  const {viewMenu,screenSize}=useSelector(state=>state.main)
  const handleCloseSidebar=()=>{
    if(viewMenu && screenSize<=900)
     dispatch(setViewMenu(false))
}
  
  return <div>{viewMenu &&
    <div className='w-72 fixed sidebar  bg-gray-200 h-full'>
      
  <button type='button' className="absolute right-5 top-3 text-xl rounded-full p-3 hover:bg-light-gray text-slate-500 hover:text-slate-800  block md:hidden" onClick={handleCloseSidebar}>
            <MdOutlineCancel/>
        </button>
        {user.userType==='buyer'?<Filter/>:<Navbar handleCloseSidebar={handleCloseSidebar}/>}
  
    </div>}
      </div>
}

export default Sidebar