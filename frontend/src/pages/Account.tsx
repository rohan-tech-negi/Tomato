import React from 'react'
import { useAppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
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
    <div>Account</div>
  )
}
