import React from 'react'
import { useAppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GoPackage } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { TbMapPin } from "react-icons/tb";

export const Account = () => {
  const {user, setUser, setIsAuth} = useAppData()

  const firstLetter = user?.name.charAt(0).toUpperCase()

  const navigate = useNavigate()

  const logoutHandler =()=>{
    localStorage.setItem("token", "")
    setUser(null)
    setIsAuth(false)
    navigate("/login")
    toast.success("Logout successfully")
    
  }
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
      <div className='mx-auto max-w-md rounded-lg bg-wwhite shadow-sm '>
        <div className='flex items-center gap-4 border-b p-5'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl font-semibold text-white'>
            {firstLetter}
          </div>
          <div>
            <h2 className='font-semibold'>{user?.name}</h2>
            <p className='text-sm text-gray-500'>{user?.email}</p>
          </div>
        </div>

        <div className='divide-y'>
          <div className='flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50' onClick={()=> navigate("/orders")}>
              <GoPackage className='h-5 w-5 text-red-500'/>
              <span className='font-medium'>Tour Orders</span>
          </div>
          <div className='flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50' onClick={()=> navigate("/address")}>
              <TbMapPin  className='h-5 w-5 text-red-500'/>
              <span className='font-medium'>Addressess</span>
          </div>
          <div className='flex cursor-pointer items-center gap-4 p-5 hover:bg-gray-50' onClick={logoutHandler}>
              <BiLogOut  className='h-5 w-5 text-red-500'/>
              <span className='font-medium'>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}
