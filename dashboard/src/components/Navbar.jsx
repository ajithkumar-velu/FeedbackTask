import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex gap-5 bg-green-800 text-white px-4 sm:px-9 md:px-[4%] py-5' > 
            <NavLink to={'/'} >
                Feedback
            </NavLink>
            <NavLink to={'/dashbord'} >
                Dashbord
            </NavLink>

        </div>
    )
}

export default Navbar
