import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import {BsFillRocketFill} from 'react-icons/bs'
import {BsPersonFill} from 'react-icons/bs'
import {AiOutlineMenu} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import * as actionType from "../helpers/constants"
import { setViewMenu } from '../actions/main'
const Header = ({cartCount}) => {
    const dispatch=useDispatch()
    const {cart}=useSelector(state=>state.cart)
    const profileDropdown=useRef(null)
    const [view,setView]=useState(false)
    const {viewMenu}=useSelector(state=>state.main)
    const {authData:user}=useSelector(state=>state.auth)
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
      };
      const handleClose=()=>{
        setView(p=>!p)
       }
      const handleClickOutside = (event) => {
        if (profileDropdown.current && !profileDropdown.current.contains(event.target)) {
            setView(false);
        }
    };
      useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })
    // useEffect(()=>{
    //    if(user?.userType=='buyer')
    //    dispatch(getCart())
    // },[dispatch])
  return (
    <div className="p-8 sticky top-0 z-10 w-full px-6 py-4 pr-12 flex justify-between items-center bg-slate-100">
        <div className="flex items-center gap-2">
        <Link to="/"><BsFillRocketFill/></Link>
        <button className='cursor-pointer block md:hidden dark:text-white text-slate-900' onClick={()=>dispatch(setViewMenu(!viewMenu))}>
        <AiOutlineMenu/>
      </button>
        </div>
        
        <div className="flex gap-5 items-center">
            {user?.userType=='buyer'?<Link to="/products">Products</Link>:<Link to="/dashboard">Dashboard</Link>}
            
{/* <form className='w-[300px]'>
    <div className="flex">
        <div className="relative w-full">
            <input 
            type="search" 
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for city or address" required/>
            <button 
            type="submit" 
            className="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FiSearch/>
            </button>
        </div>
    </div>
</form> */}
         {user?.userType=='buyer' && 
         <Link to="/cart" className='relative'>
         {cartCount>0 && <div className="-top-4 absolute left-3">
 <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cartCount}</p>
</div>}
             <BsFillBagFill/>
         </Link>}
            
            <div className='relative cursor-pointer' ref={profileDropdown} onClick={()=>setView(p=>p)}>
                <BsPersonFill className='text-xl' onClick={handleClose}/>
                    {view &&<div 
                className={`absolute right-0 z-10 mt-2 w-56 origin-top-right 
                rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <Link to="/orders" 
                    onClick={handleClose}
                    className='cursor-pointer block rounded-md px-4 py-2 text-sm hover:bg-gray-100'>Orders</Link>
                    <div 
                    key={`op-1`}
                    onClick={logout}
                    className='cursor-pointer block rounded-md px-4 py-2 text-sm hover:bg-gray-100'>Logout</div>
                    </div>
                    }
            </div>
        </div>
    </div>
  )
}

export default Header