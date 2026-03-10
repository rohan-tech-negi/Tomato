import React, { useEffect, useState } from 'react'
import { useAppData } from '../context/AppContext'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {
    const {isAuth} = useAppData()
    const currLocation = useLocation()

    const isHomePage = currLocation.pathname === "/"

    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(search){
                setSearchParams({search})
            }

            else{
                setSearchParams({})
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [search])
  return (
    <div className='w-full bg-white shadow-sm'>
        <div className='mx-auto flex max-w-7xl items-center justify-center px-4 py-3'>
            <Link to={"/"} className='text-2xl font-bold text-[#E23744] cursor-pointer'>Tomato</Link>

            <div className='flex items-center gap-4'>
                <Link to={'/cart'} className='relative'>
                    <FaCartShopping className='h-6 w-6 text-[#E23744]'/>
                    <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white'>0</span>
                </Link>

                {
                    isAuth ? <Link to="/account" className='font-medium text-red-500'>Account</Link> :   <Link to="/login" className='font-medium text-red-500'>Login</Link>
                }
            </div>
        </div>

        {/* search bar */}
        
    </div>
  )
}

export default Navbar