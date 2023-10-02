import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiSolidDashboard} from 'react-icons/bi'
import { useSelector,useDispatch } from 'react-redux'
const Navbar = ({handleCloseSidebar}) => {
    const links=[
        {
            name:'products',
            path:"/dashboard",
            icon:<BiSolidDashboard/>
        },
        {
          name:'orders',
          path:"/dashboard/orders",
          icon:<BiSolidDashboard/>
      },
    ]
   
      return (
        <div className=''>
           <div className="pt-12 md:pt-2">
            {links.map(item=>
                <div key={item.name}>
                    <NavLink
                end
                to={item.path}
                onClick={handleCloseSidebar}
                className={({isActive})=>`flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 ${isActive?`text-white bg-cyan-600`:`text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray`}`}
                >
                 {item.icon}
                 <span className="capitalize">{item.name}</span>
                </NavLink>
                </div>)}
            
        </div>
        </div>
      )
}

export default Navbar