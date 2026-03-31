import React, { useEffect } from 'react'
// import { Irestaurant } from '../types'
import axios from 'axios'
import { useState

 } from 'react'
import { restaurantService } from '../main'
import type { IRestaurant } from '../types'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantProfile from '../components/RestaurantProfile'

type SellerTab = "menu" | "add-item" | "sales";
const Restaurant = () => {

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)

  const [loading , setLoading] = useState(true)

  const[Tab, setTab] = useState<SellerTab>("menu")

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
        window.location.reload()
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

   if(!restaurant){
    return <AddRestaurant fetchMyRestaurant={fetchRestaurant}></AddRestaurant>
   }
  return (
    <div className='min-h-screen bg-gray-50 px-4 py--6 space-y-6'>
      <RestaurantProfile restaurant={restaurant} onUpdate={setRestaurant} isSeller={true}></RestaurantProfile>
      <div className='rounded-xl bg-white shadow-sm'>
        <div className='flex border-b'>
          {[
            {key: "menu", label: "Menu Items"},
            {key: "add-item", label: "Add Item"},
            {key: "sales", label: "sales"},
          ].map((tab)=>(
            <button key={tab.key} onClick={()=>setTab(tab.key as SellerTab)} className={`flex-1 px-4 py-3 text-sm font-medium trannsition ${Tab === tab.key ? "border-b-2 border-red-500 text-red-500" : "text-gray-500 hover:text-gray-700"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className='p-5 '>
            {Tab === "menu" && <p>Menu Page</p>}
            {Tab === "add-item" && <p>Add Item Page</p>}
            {Tab === "sales" && <p>Sales Page</p>}
        </div>
      </div>
    </div>
  )
}

export default Restaurant