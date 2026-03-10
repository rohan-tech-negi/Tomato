import React, { useEffect, useState } from 'react'
import { useAppData } from '../context/AppContext'
import { useLocation, useSearchParams } from 'react-router-dom'

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
    <div>Navbar</div>
  )
}

export default Navbar