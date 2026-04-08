import React, { useEffect, useState } from 'react'
import { useAppData } from '../context/AppContext'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { PiMapPinDuotone } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
    const {isAuth, city, Quantity} = useAppData()
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
                    <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white'>{Quantity}</span>
                </Link>

                {
                    isAuth ? <Link to="/account" className='font-medium text-red-500'>Account</Link> :   <Link to="/login" className='font-medium text-red-500'>Login</Link>
                }
            </div>
        </div>

        {/* search bar */}
        {
            isHomePage && <div className='border-t px-4 py-3'>
                <div className='mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm'>

                    <div className='flex items-center gap-3 px-3 border-r text-gray-700'>
                        <PiMapPinDuotone className='h-4 w-4 text-red-500'/>
                        <span className='text-sm truncate max-w-35'>{city}</span>
                    </div>
                    <div className='flex flex-1 items-center gap-2 px-3'>
                        <CiSearch className='h-4 w-4 text-gray-400'/>
                        <input type="text" placeholder='Search for restaurant' value={search} onChange={e=> setSearch(e.target.value)} className='w-full py-2 text-sm outline-none'/>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Navbar