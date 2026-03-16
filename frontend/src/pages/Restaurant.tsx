import React, { useEffect } from 'react'
// import { Irestaurant } from '../types'
import axios from 'axios'
import { useState

 } from 'react'
import { restaurantService } from '../main'
import type { IRestaurant } from '../types'
const Restaurant = () => {

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)

  const [loading , setLoading] = useState(true)

  const fetchRestaurant = async () => {
    try {
      const {data} = await axios.get(`${restaurantService}/api/restaurant/my`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setRestaurant(data.restaurant || null)

      if(data.token){
        localStorage.setItem("token", data.token)
      }
    } catch (error) {
        console.log(error)   
    }
    finally{
      setLoading(false)
    }
  }
   useEffect(()=>{
    fetchRestaurant()
   },[])

   if(loading) return <div className='flex min-g-screen items-center justify-center'><p className='text-gray-500'>Loading your Restaurant....</p></div>
  return (
    <div>Restaurant</div>
  )
}

export default Restaurant