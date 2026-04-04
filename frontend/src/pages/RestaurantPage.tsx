// import React from 'react'

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMenuItems, IRestaurant } from "../types"
import axios from "axios"
import { restaurantService } from "../main"

const RestaurantPage = () => {
  const{id} = useParams()

  const[restaurant, setRestaurant] = useState<IRestaurant | null>(null)
  const[MenuItems, setMenuItems] = useState<IMenuItems[]>([])
  const[loading, setLoading] = useState(true)

  const fetchRestaurant = async()=>{
    try {
      const {data} = await axios.get(`${restaurantService}/api/restaurants/${id}`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setRestaurant(data || null)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const fetchMenuItems = async()=>{
      try {
        const {data} = await axios.get(`${restaurantService}/api/item/all/${id}`, 
          {
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        setMenuItems(data)
      } catch (error) {
        console.log(error)
      }
   }

   useEffect(()=>{
    if(id){
      fetchRestaurant()
      fetchMenuItems()
    }
   })
  return (
    <div>RestaurantPage</div>
  )
}

export default RestaurantPage