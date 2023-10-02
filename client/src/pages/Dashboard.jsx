import React from 'react'
import {Sidebar} from "../components"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Dashboard = () => {
    const {viewMenu}=useSelector(state=>state.main)
  return (
        <div className="flex relative dark:bg-main-dark-bg">
    {viewMenu?
    <div className='w-72 h-full fixed sidebar dark:bg-secondary-dark-bg bg-gray-100'>
      <Sidebar/>
    </div>:
    <div className='w-0 dark:bg-secondary-dark-bg'>
      <Sidebar/>
      </div>}
      <div className={`relative dark:bg-main-dark-bg bg-main-bg  w-full ${viewMenu?'md:ml-72':'flex-2'}`}>
        <Outlet/>
      </div>
      </div>
     
  )
}

export default Dashboard